package automationcodingproject.utilities;

import java.io.IOException;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class Xml {
	
	DocumentBuilderFactory factory;
	DocumentBuilder builder;
    InputSource is;

	public String GetAttributeValue(String xml,String nodeName, String attribute) {
		String value = null;
		factory = DocumentBuilderFactory.newInstance();
		try {
	        builder = factory.newDocumentBuilder();
	        is = new InputSource(new StringReader(xml));
	        Document doc = builder.parse(is);
	        NodeList list = doc.getElementsByTagName(nodeName);
	        for (int i = 0; i < list.getLength(); i++)
	        {
	            Node currentItem = list.item(i);
	            value = currentItem.getAttributes().getNamedItem(attribute).getNodeValue();
	        }
	    } catch (ParserConfigurationException e) {
	    } catch (SAXException e) {
	    } catch (IOException e) {
	    }
		return value;
	}
}
