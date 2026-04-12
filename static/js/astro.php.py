<?php
// 引入 Swisseph 库
require_once('sweph.php');

// 获取表单数据
$gender = $_GET['gender'];
$birthDate = $_GET['birthDate'];
$birthPlace = $_GET['birthPlace'];
$queryDate = $_GET['queryDate'];

// 解析日期时间
$birthDateTime = new DateTime($birthDate);
$queryDateTime = new DateTime($queryDate);

// 设置 Swisseph 参数
$swephPath = './sweph';  // Swisseph 数据文件路径
swe_set_ephe_path($swephPath);

// 计算本命星盘
$jdBirth = swe_julday($birthDateTime->format('Y'), $birthDateTime->format('m'), $birthDateTime->format('d'), $birthDateTime->format('H') + ($birthDateTime->format('i') / 60), SE_GREG_CAL);
$planets = array(SE_SUN, SE_MOON, SE_MERCURY, SE_VENUS, SE_MARS, SE_JUPITER, SE_SATURN, SE_URANUS, SE_NEPTUNE, SE_PLUTO);
$houses = array();
$signs = array();

foreach ($planets as $planet) {
    $result = swe_calc_ut($jdBirth, $planet, SEFLG_SPEED);
    $houses[$planet] = getHouse($result[0]);
    $signs[$planet] = getSign($result[0]);
}

// 计算行运星盘
$jdQuery = swe_julday($queryDateTime->format('Y'), $queryDateTime->format('m'), $queryDateTime->format('d'), $queryDateTime->format('H') + ($queryDateTime->format('i') / 60) + ($queryDateTime->format('s') / 3600), SE_GREG_CAL);
$transitHouses = array();
$transitSigns = array();

foreach ($planets as $planet) {
    $result = swe_calc_ut($jdQuery, $planet, SEFLG_SPEED);
    $transitHouses[$planet] = getHouse($result[0]);
    $transitSigns[$planet] = getSign($result[0]);
}

// 计算相位关系
$aspects = array();
foreach ($planets as $planet1) {
    foreach ($planets as $planet2) {
        if ($planet1 != $planet2) {
            $angle1 = swe_calc_ut($jdBirth, $planet1, SEFLG_SPEED)[0];
            $angle2 = swe_calc_ut($jdQuery, $planet2, SEFLG_SPEED)[0];
            $degree = abs($angle1 - $angle2);
            $aspect = getAspect($degree);
            $aspects[$planet1][$planet2] = $aspect;
        }
    }
}

// 从 Excel 文件中检索信息
$excelFile = $_SERVER['HOME'] . '/Desktop/astrology.xlsx';
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$spreadsheet = $reader->load($excelFile);
$worksheet = $spreadsheet->getActiveSheet();
$events = array();

foreach ($worksheet->getRowIterator() as $row) {
    $cellIterator = $row->getCellIterator();
    $cellIterator->setIterateOnlyExistingCells(false);
    $cells = iterator_to_array($cellIterator);
    $starSign = $cells[0]->getValue();
    $planetHouse = $cells[1]->getValue();
    $planetAspect = $cells[2]->getValue();
    $event = $cells[3]->getValue();

    // 简单匹配逻辑，实际需要根据具体情况调整
    if ($starSign == $signs[SE_SUN] || $starSign == getAscendantSign($jdBirth)) {
        foreach ($transitHouses as $planet => $house) {
            if (strpos($planetHouse, getPlanetName($planet) . '位于' . $house . '宫') !== false) {
                foreach ($aspects as $p1 => $p2Aspects) {
                    foreach ($p2Aspects as $p2 => $aspect) {
                        if (strpos($planetAspect, getPlanetName($p1) . '与' . getPlanetName($p2) . '呈' . $aspect) !== false) {
                            $events[] = $event;
                        }
                    }
                }
            }
        }
    }
}

// 输出结果
echo "<h2>本命星盘信息</h2>";
foreach ($planets as $planet) {
    echo getPlanetName($planet) . " 位于 " . $houses[$planet] . " 宫，星座：" . $signs[$planet] . "<br>";
}

echo "<h2>行运星盘信息</h2>";
foreach ($planets as $planet) {
    echo "行运" . getPlanetName($planet) . "（行运）位于 " . $transitHouses[$planet] . " 宫（本命）<br>";
}

echo "<h2>相位关系信息</h2>";
foreach ($aspects as $planet1 => $p2Aspects) {
    foreach ($p2Aspects as $planet2 => $aspect) {
        echo "行运(" . $transitSigns[$planet2] . ")" . getPlanetName($planet2) . " 与 本命(" . $signs[$planet1] . ")" . getPlanetName($planet1) . " 呈 " . $aspect . "<br>";
    }
}

echo "<h2>代表事件信息</h2>";
foreach ($events as $event) {
    echo $event . "<br>";
}

// 辅助函数
function getHouse($angle) {
    return floor($angle / 30) + 1;
}

function getSign($angle) {
    $signs = array("白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯", "水瓶", "双鱼");
    return $signs[floor($angle / 30)];
}

function getAspect($degree) {
    if ($degree < 10) {
        return "合相";
    } elseif (abs($degree - 60) < 10) {
        return "六合相";
    } elseif (abs($degree - 90) < 10) {
        return "刑相";
    } elseif (abs($degree - 120) < 10) {
        return "三合相";
    } elseif (abs($degree - 180) < 10) {
        return "冲相";
    }
    return "";
}

function getPlanetName($planet) {
    $names = array(
        SE_SUN => "太阳",
        SE_MOON => "月亮",
        SE_MERCURY => "水星",
        SE_VENUS => "金星",
        SE_MARS => "火星",
        SE_JUPITER => "木星",
        SE_SATURN => "土星",
        SE_URANUS => "天王星",
        SE_NEPTUNE => "海王星",
        SE_PLUTO => "冥王星"
    );
    return $names[$planet];
}

function getAscendantSign($jd) {
    // 计算上升星座逻辑，这里简单返回一个示例值
    return "白羊";
}
?>