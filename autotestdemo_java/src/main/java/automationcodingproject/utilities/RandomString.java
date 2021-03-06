package automationcodingproject.utilities;

import java.util.Random;

public class RandomString {
	private static final char[] symbols;
	static {
		StringBuilder tmp = new StringBuilder();
		for (char ch = '0'; ch <= '9'; ++ch)
			tmp.append(ch);
		for (char ch = 'a'; ch <= 'z'; ++ch)
			tmp.append(ch);
		symbols = tmp.toString().toCharArray();
	}

	private final static Random random = new Random();

	private static char[] buf;

	public static String nextString(int length) {
		if (length < 1)
			throw new IllegalArgumentException("length < 1: " + length);
		buf = new char[length];
		for (int idx = 0; idx < buf.length; ++idx)
			buf[idx] = symbols[random.nextInt(symbols.length)];
		return new String(buf);
	}

	public static void main(String[] args) {
		for (int i = 0; i < 10; i++) {
			System.out.println(RandomString.nextString(6));
		}
	}
}
