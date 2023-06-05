package com.example.dtt_r5;

import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class reservation_data {
    private final MainActivity1 store1;
    private final MainActivity2 store2;
    private final Order1 order1;
    private final Order2 order2;

    public reservation_data(MainActivity1 store1, MainActivity2 store2, Order1 order1, Order2 order2) {
        this.store1 = store1;
        this.store2 = store2;
        this.order1 = order1;
        this.order2 = order2;
    }
    //매장1 예약정보 받기
    public void receiveReservationInfoForStore(int store_num) {
        String url_reserve1 = "http://192.168.55.182:8080/1/reservations/date";
        String url_reserve2 = "http://192.168.55.182:8080/2/reservations/date";

        if(store_num==1){ //매장1에서 갱신버튼 클릭으로 호출했을 때
            try {
                URL apiUrl = new URL(url_reserve1);
                HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
                connection.setRequestMethod("GET");

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    reader.close();

                    String responseData = response.toString();


                    processReservationInfo(responseData, store_num);
                } else {
                    Toast.makeText(store1, "Reservation data Error", Toast.LENGTH_SHORT).show();
                }

                connection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else if(store_num==2){//매장2에서 갱신버튼 클릭으로 호출했을 때
            try {
                URL apiUrl = new URL(url_reserve2);
                HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
                connection.setRequestMethod("GET");

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    reader.close();

                    String responseData = response.toString();


                    processReservationInfo(responseData, store_num);
                } else {
                    Toast.makeText(store2, "Reservation data Error", Toast.LENGTH_SHORT).show();
                }

                connection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void processReservationInfo(String responseData, int store_num) {
        if(store_num==1){
            store1.setreservedata(responseData);
            order1.setreservedata(responseData);
            order2.setreservedata(responseData);
        } else if (store_num==2) {
            store2.setreservedata(responseData);
            order1.setreservedata(responseData);
            order2.setreservedata(responseData);
        }
    }

}
