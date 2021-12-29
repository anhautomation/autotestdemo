package automationcodingproject.utilities;

import java.awt.AWTException;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;

public class ScreenCapture {
	
	protected String _location;
	protected Robot _robot;
	protected Rectangle _screenRect;
	
	public ScreenCapture(String location) throws AWTException, IOException{
		_robot = new Robot();
		_location = location;
		File dir = new File(_location);
		if (dir.exists()){
			FileUtils.cleanDirectory(dir);
		}else{
			dir.mkdirs();
		}
	}
	
	public void fullScreenCapture(String extension, String fileName) throws AWTException, IOException{
		_screenRect = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
        BufferedImage screenFullImage = _robot.createScreenCapture(_screenRect);
        ImageIO.write(screenFullImage, extension, new File(_location+"/"+fileName+"."+extension));
	}
	
	public void fixedSizeScreenCapture(String extension, String fileName, int x, int y, int width, int height) throws AWTException, IOException{
		_screenRect = new Rectangle(x , y, width, height);
        BufferedImage screenFullImage = _robot.createScreenCapture(_screenRect);
        ImageIO.write(screenFullImage, extension, new File(_location+"/"+fileName+"."+extension));
	}

}
