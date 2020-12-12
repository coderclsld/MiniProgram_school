package DPI.FileUpload;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
public class FileUpload {
	
	 @Autowired
	 private AppConfig config;
	 
	 @RequestMapping("/test")
	 public String returnString() {
		 System.out.println("sssssssssssss");
		 return "sss";
	 }
	 
	 @RequestMapping("/upload")
	 @ResponseBody
	 public String upload(HttpServletRequest request, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		 
        System.out.println("执行upload");
        request.setCharacterEncoding("UTF-8");
        System.out.println("执行图片上传");
        String user = request.getParameter("user");
        System.out.println("user:"+user);
        if(!file.isEmpty()) {
            System.out.println("成功获取照片");
            String fileName = file.getOriginalFilename();
            String path = null;
            String type = null;
            type = fileName.indexOf(".") != -1 ? fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length()) : null;
            System.out.println("图片初始名称为：" + fileName + " 类型为：" + type);
            if (type != null) {
                if ("GIF".equals(type.toUpperCase())||"PNG".equals(type.toUpperCase())||"JPG".equals(type.toUpperCase())) {
                    // 项目在容器中实际发布运行的根路径
                    String realPath = request.getSession().getServletContext().getRealPath("/");
                    // 自定义的文件名称
                    String trueFileName = String.valueOf(System.currentTimeMillis()) + fileName;
                    // 设置存放图片文件的路径
                    File myPath = new File("D:\\dpi");
                    if ( !myPath.exists()){
                    	myPath.mkdir();
                    	System.out.println("创建文件夹路径为："+ myPath.getPath());
                    }
                    path = myPath.getPath() +"/"+ trueFileName;
                    System.out.println("存放图片文件的路径:" + path);
                    file.transferTo(new File(path));
                    System.out.println("文件成功上传到指定目录下");
                }else {
                    System.out.println("不是我们想要的文件类型,请按要求重新上传");
                    return "error";
                }
            }else {
                System.out.println("文件类型为空");
                return "error";
            }
        }else {
            System.out.println("没有找到相对应的文件");
            return "error";
        }
        return "success";
    }
 	/** 
     * @ 单一文件上传
     * @param file
     * @param request
     * @return
     */
    @RequestMapping("/upload2")
    @ResponseBody
	private String handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		// TODO Auto-generated method stub
    	if (!file.isEmpty()) {
            String saveFileName = getFileName(file);
            System.out.println(file.getName());
            File saveFile = new File(config.getUploadFolder() + saveFileName);
//            System.out.println(saveFile.getAbsolutePath());
            if (!saveFile.getParentFile().exists()) {
                saveFile.getParentFile().mkdirs();
            }
            try {
                BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(saveFile));
                out.write(file.getBytes());
                out.flush();
                out.close();
                return config.getPreviewPath() + saveFile.getName();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                return "上传失败,";
            } catch (IOException e) {
                e.printStackTrace();
                return "上传失败,";
            }
        } else {
            return "上传失败，因为文件为空.";
        }
	}

	private String getFileName(MultipartFile file) {
		// TODO Auto-generated method stub
		String name = file.getOriginalFilename();
        StringBuilder sb = new StringBuilder();
        Date date = new Date();
        sb.append(date.getTime());
        sb.append(name.substring(name.indexOf(".")));
        return sb.toString();
	}

}