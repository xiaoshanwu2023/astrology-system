from PIL import Image
import os
import pathlib

def convert_webp_to_jpg(dolder_path):
    target_folder = "~/desktop/astrology-system"
    # 解析路径，处理波浪号~和空格
    resolved_path = pathlib.Path(folder_path).expanduser().resolve()
    
    # 检查文件夹是否存在
    if not resolved_path.exists():
        print(f"错误：文件夹 '{resolved_path}' 不存在")
        return
    
    # 遍历文件夹中的所有文件
    for filename in os.listdir(resolved_path):
        # 检查文件是否为webp格式
        if filename.lower().endswith('.webp'):
            # 构建完整的文件路径
            webp_path = resolved_path / filename
            
            # 创建新的文件名（替换扩展名为jpg）
            jpg_filename = os.path.splitext(filename)[0] + '.jpg'
            jpg_path = resolved_path / jpg_filename
            
            try:
                # 打开webp图片并转换为jpg
                with Image.open(webp_path) as img:
                    # 如果图片有alpha通道（透明背景），需要处理
                    if img.mode in ('RGBA', 'LA'):
                        background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
                        background.paste(img, img.split()[-1])
                        img = background
                    
                    # 保存为jpg格式，质量设为95
                    img.convert('RGB').save(jpg_path, 'JPEG', quality=95)
                print(f"已转换: {filename} -> {jpg_filename}")
                
            except Exception as e:
                print(f"转换失败 {filename}: {str(e)}")

if __name__ == "__main__":
    # 指定桌面的astrology system文件夹
    target_folder = "~/desktop/astrology system"
    
    print(f"开始转换文件夹中的webp图片...")
    convert_webp_to_jpg(target_folder)
    print("转换完成！")
    