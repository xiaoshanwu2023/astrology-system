from PIL import Image
import os
import pathlib

def convert_webp_to_jpg(folder_path):
    # 解析路径
    resolved_path = pathlib.Path(folder_path).expanduser().resolve()
    
    if not resolved_path.exists():
        print(f"错误：文件夹不存在 - {resolved_path}")
        return
    
    for filename in os.listdir(resolved_path):
        if filename.lower().endswith('.webp'):
            webp_path = resolved_path / filename
            jpg_filename = os.path.splitext(filename)[0] + '.jpg'
            jpg_path = resolved_path / jpg_filename
            
            try:
                with Image.open(webp_path) as img:
                    # 处理透明背景
                    if img.mode in ('RGBA', 'LA'):
                        background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
                        background.paste(img, img.split()[-1])
                        img = background
                    
                    img.convert('RGB').save(jpg_path, 'JPEG', quality=95)
                print(f"已转换: {filename}")
                
            except Exception as e:
                print(f"转换失败 {filename}: {str(e)}")

if __name__ == "__main__":
    # 请根据你的实际文件夹名称修改（如果有空格保持空格）
    target_folder = "/Users/wuxiaoshan/Desktop/astrology-system"
    
    print(f"开始转换文件夹: {target_folder}")
    convert_webp_to_jpg(target_folder)
    print("转换完成！")
    