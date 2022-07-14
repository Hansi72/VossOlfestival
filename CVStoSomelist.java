package ble;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class opk {
		public static void main(String[] args) throws IOException {
			boolean first = true;
			boolean first1 = true;
			String[] rowData;
			String row;
			String Json = " ";
			
			Json = Json + '"';
			Json = Json + "BryggListe";
			Json = Json + '"';
			Json = Json + " : {        ";
			
			BufferedReader csvReader = new BufferedReader(new FileReader("C:\\Users\\hansihansi\\Desktop\\liste.csv"));
			while ((row = csvReader.readLine()) != null) {
				rowData = row.split(",");
				if(first) {
					first = false;
					continue;
				}

				if (rowData.length == 2) {
					Json = Json.substring(0, Json.length() - 6);
					if(first1) {
						first1 = false;
					}else {
						Json = Json + "] ,";
					}
					Json = Json + "\n";
					Json = Json + '"';
					Json = Json + rowData[1];
					Json = Json + '"';
					Json = Json + " : [{ ";
					continue;
				}

				for (int i = 0; i < rowData.length; i++) {
					if (i > 1) {
					Json = Json + '\n';
					Json = Json + '"';
					}
					if (i == 2) {
					Json = Json + "Navn";
					Json = Json + '"';
					Json = Json + " : ";
					Json = Json + '"';
					Json = Json + rowData[i];
					Json = Json + '"';
					Json = Json + ',';
					}
					if (i == 3) {
						Json = Json + "Type";
						Json = Json + '"';
						Json = Json + " : ";
						Json = Json + '"';
						Json = Json + rowData[i];
						Json = Json + '"';
						Json = Json + ',';
						}
					if (i == 4) {
						Json = Json + "Styrke";	
						Json = Json + '"';
						Json = Json + " : ";
						Json = Json + '"';
						Json = Json + rowData[i];
						Json = Json + '"';
						Json = Json + ',';
						}
					if (i == 5) {
						Json = Json + "rad5";
						Json = Json + '"';
						Json = Json + " : ";
						Json = Json + '"';
						Json = Json + rowData[i];
						Json = Json + '"';
						}
				}
				Json = Json + "\n }, { \n ";
				
				

			}
			Json = Json.substring(0, Json.length() - 6);
			Json = Json + "] \n\n\n },";
			
			//System.out.println(Json);
			csvReader.close();
			
			
			
			
		}	
}