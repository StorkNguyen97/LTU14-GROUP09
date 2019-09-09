package com.hust.soict.anhnd.client_server;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

import com.hust.soict.anhnd.helper.*;

import java.util.Arrays;

public class Server {

    private static Socket socket;

    public static void main(String[] args) {
        try {

            int port = 9898;
            ServerSocket serverSocket = new ServerSocket(port);
            System.out.println("Server Started and listening to the port" + port);

            //Server is running always. This is done using this while(true) loop
            while (true) {
                //Reading the message from the client
                socket = serverSocket.accept();

                InputStream is = socket.getInputStream();
                InputStreamReader isr = new InputStreamReader(is);
                BufferedReader br = new BufferedReader(isr);
                String number = br.readLine();

                System.out.println("Message received from client is " + number);
                //Put it in a string array
                String[] nums = number.split(" ");

                //Convert this string array to an int array
                int[] intarr = new int[nums.length];

                int i = 0;

                for (String textValue : nums) {
                    intarr[i] = Integer.parseInt(textValue);
                    i++;
                }
                //Sort the numbers in this int array
                new SelectionSort().sort(intarr);
                //Convert the int array to String
                String strArray[] = Arrays.stream(intarr)
                        .mapToObj(String::valueOf)
                        .toArray(String[]::new);

                //Send the result to Client
                String resultString = Arrays.toString(strArray);
                System.out.println(resultString);


                //Multiplying the number by 2 and forming the return message
                String returnMessage;
                try {
                    returnMessage = resultString + "\n";
                } catch (NumberFormatException e) {
                    //Input was not a number. Sending proper message back to client.
                    returnMessage = Arrays.toString(strArray);
                }

                //Sending the response back to the client.
                OutputStream os = socket.getOutputStream();
                OutputStreamWriter osw = new OutputStreamWriter(os);
                BufferedWriter bw = new BufferedWriter(osw);
                bw.write(returnMessage);
                System.out.println("Message sent to the client is " + returnMessage);
                bw.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (Exception e) {
            }
        }
    }
}
