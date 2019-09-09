package com.hust.soict.anhnd.client_server;

import jdk.nashorn.internal.runtime.regexp.joni.Regex;

import java.io.*;
import java.net.Socket;
import java.util.Scanner;

public class Client {

    public static void main(String[] args) {

        Socket socket = null;
        Scanner scanner = null;
        try {
            socket = new Socket("127.0.0.1", 9898);

            //Send the message to the server
            OutputStream os = socket.getOutputStream();
            OutputStreamWriter osw = new OutputStreamWriter(os);
            BufferedWriter bw = new BufferedWriter(osw);

            scanner = new Scanner(System.in);

            // Decide the number of array
            System.out.println("Enter the number of array");
            int numOfArray = Integer.parseInt(scanner.nextLine());

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < numOfArray; i++) {
                builder.append(scanner.nextLine());
                if (i < numOfArray - 1) builder.append(" ");
            }
            String number = builder.toString();
            System.out.println(number);
            String sendMessage = number + "\n";
            bw.write(sendMessage);
            bw.flush();
            System.out.println("Message sent to the server : " + sendMessage);

            //Get the return message from the server
            InputStream is = socket.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);
            String message = br.readLine();
            System.out.println("Message received from the server : " + message);
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            //Closing the socket
            try {
                socket.close();
                scanner.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
