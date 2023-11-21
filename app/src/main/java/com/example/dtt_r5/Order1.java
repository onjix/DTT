package com.example.dtt_r5;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Order1 extends AppCompatActivity {

    private Button confirm, pay;
    private EditText TotalPrice;
    private EditText pd1, pd2, pd3, pd4, pd5, pd6, pd7, pd8, pd9;
    private EditText reserve_data;

    private int total = 0;

    private int store_num=0;
    private int pd1_price=0, pd2_price=0,  pd3_price=0, pd4_price=0, pd5_price=0, pd6_price=0, pd7_price=0, pd8_price=0, pd9_price=0;
    private int pd1_num=0, pd2_num=0, pd3_num=0, pd4_num=0, pd5_num=0, pd6_num=0, pd7_num=0, pd8_num=0, pd9_num=0;
    private static final String SERVER_URL1_1 = "http://192.168.55.182:8080/table/1/changeY/1";
    private static final String SERVER_URL1_2 = "http://192.168.55.182:8080/table/1/changeN/1";

    private static final String SERVER_URL2_1 = "http://192.168.55.182:8080/table/2/changeY/1";
    private static final String SERVER_URL2_2 = "http://192.168.55.182:8080/table/2/changeN/1";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order1);
        confirm = findViewById(R.id.btn_confirm);
        pay = findViewById(R.id.btn_pay);

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            store_num = extras.getInt("data", 0); // "data" 키로 전달된 값 가져오기 (기본값: 0)
        }


        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent resultIntent = new Intent();
                resultIntent.putExtra("state", 1);
                if (store_num==1){
                    sendDataToServer(1);
                }
                else if(store_num==2){
                    sendDataToServer(3);
                }
                resultIntent.putExtra("total", total);
                setResult(RESULT_OK, resultIntent);
                finish();
            }
        });

        pay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent resultIntent = new Intent();
                resultIntent.putExtra("state", 2);
                if (store_num==1){
                    sendDataToServer(2);
                }
                else if(store_num==2){
                    sendDataToServer(4);
                }
                setResult(RESULT_OK, resultIntent);
                finish();
            }
        });

        TotalPrice = findViewById(R.id.et_totalprice);

        pd1 = findViewById(R.id.et_pd1);
        pd2 = findViewById(R.id.et_pd2);
        pd3 = findViewById(R.id.et_pd3);
        pd4 = findViewById(R.id.et_pd4);
        pd5 = findViewById(R.id.et_pd5);
        pd6 = findViewById(R.id.et_pd6);
        pd7 = findViewById(R.id.et_pd7);
        pd8 = findViewById(R.id.et_pd8);
        pd9 = findViewById(R.id.et_pd9);


        Button btnProduct1 = findViewById(R.id.btn_product1);
        Button btnProduct2 = findViewById(R.id.btn_product2);
        Button btnProduct3 = findViewById(R.id.btn_product3);
        Button btnProduct4 = findViewById(R.id.btn_product4);
        Button btnProduct5 = findViewById(R.id.btn_product5);
        Button btnProduct6 = findViewById(R.id.btn_product6);
        Button btnProduct7 = findViewById(R.id.btn_product7);
        Button btnProduct8 = findViewById(R.id.btn_product8);
        Button btnProduct9 = findViewById(R.id.btn_product9);


        btnProduct1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pd1.setVisibility(View.VISIBLE);
                String productName = "상품1";

                pd1_num++;
                pd1_price = pd1_num * 10000;
                pd1.setText(productName + " / 수량 : " + pd1_num + " / 가격 : " + pd1_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

        btnProduct2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pd2.setVisibility(View.VISIBLE);
                String productName = "상품2";

                pd2_num++;
                pd2_price = pd2_num * 10000;
                pd2.setText(productName + " / 수량 : " + pd2_num + " / 가격 : " + pd2_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

        btnProduct3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd3.setVisibility(View.VISIBLE);
                String productName = "상품3";

                pd3_num++;
                pd3_price = pd3_num * 10000;
                pd3.setText(productName + " / 수량 : " + pd3_num + " / 가격 : " + pd3_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

        btnProduct4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd4.setVisibility(View.VISIBLE);
                String productName = "상품4";

                pd4_num++;
                pd4_price = pd4_num * 10000;
                pd4.setText(productName + " / 수량 : " + pd4_num + " / 가격 : " + pd4_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

        btnProduct5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd5.setVisibility(View.VISIBLE);
                String productName = "상품5";

                pd5_num++;
                pd5_price = pd5_num * 10000;
                pd5.setText(productName + " / 수량 : " + pd5_num + " / 가격 : " + pd5_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

        btnProduct6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd6.setVisibility(View.VISIBLE);
                String productName = "상품6";

                pd6_num++;
                pd6_price = pd6_num * 10000;
                pd6.setText(productName + " / 수량 : " + pd6_num + " / 가격 : " + pd6_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

        btnProduct7.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd7.setVisibility(View.VISIBLE);
                String productName = "상품7";

                pd7_num++;
                pd7_price = pd7_num * 10000;
                pd7.setText(productName + " / 수량 : " + pd7_num + " / 가격 : " + pd7_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });


        btnProduct8.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd8.setVisibility(View.VISIBLE);
                String productName = "상품8";

                pd8_num++;
                pd8_price = pd8_num * 10000;
                pd8.setText(productName + " / 수량 : " + pd8_num + " / 가격 : " + pd8_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

        btnProduct9.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd9.setVisibility(View.VISIBLE);
                String productName = "상품9";

                pd9_num++;
                pd9_price = pd9_num * 10000;
                pd9.setText(productName + " / 수량 : " + pd9_num + " / 가격 : " + pd9_price);

                total += 10000;
                TotalPrice.setText("총합 : " + total);
            }
        });

    }
    private void sendDataToServer(int con) {
        // 서버로 전송할 데이터
        String data = "1";

        // AsyncTask를 사용하여 백그라운드에서 HTTP POST 요청을 보냄
        new SendDataToServerTask().execute(con, data);
    }

    private class SendDataToServerTask extends AsyncTask<Object, Void, String> {
        @Override
        protected String doInBackground(Object... params) {
            // 매개변수로 전달된 con 값을 가져옴
            int con = (int) params[0];
            // 매개변수로 전달된 데이터를 가져옴
            String data = (String) params[1];
            String response = null;

            try {
                URL url;
                // con 값에 따라 서버 URL 설정
                if (con == 1) {
                    url = new URL(SERVER_URL1_1);
                } else if (con == 2) {
                    url = new URL(SERVER_URL1_2);
                } else if (con == 3) {
                    url = new URL(SERVER_URL2_1);
                } else if (con == 4) {
                    url = new URL(SERVER_URL2_2);
                } else {
                    // 지원하지 않는 con 값 처리 (예외 처리)
                    return "Unsupported con value";
                }

                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(data.getBytes());
                outputStream.flush();
                outputStream.close();

                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String line;
                    StringBuilder stringBuilder = new StringBuilder();

                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }

                    reader.close();
                    response = stringBuilder.toString();
                } else {
                    response = "Error: " + responseCode;
                }

                connection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return response;
        }

        @Override
        protected void onPostExecute(String response) {
            // 서버로부터의 응답 처리
            Toast.makeText(Order1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }


    /*
    private void sendDataToServer(int con) {

        // 서버로 전송할 데이터
        String data = "1";

        // AsyncTask를 사용하여 백그라운드에서 HTTP POST 요청을 보냄
        if (con==1){
            new SendDataToServerTask1().execute(data);
        }
        else if (con==2){
            new SendDataToServerTask2().execute(data);
        }
        else if (con==3){
            new SendDataToServerTask3().execute(data);
        }
        else if (con==4){
            new SendDataToServerTask4().execute(data);
        }
    }

    private class SendDataToServerTask1 extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            String data = params[0];
            String response = null;

            try {
                URL url = new URL(SERVER_URL1_1);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(data.getBytes());
                outputStream.flush();
                outputStream.close();

                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String line;
                    StringBuilder stringBuilder = new StringBuilder();

                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }

                    reader.close();
                    response = stringBuilder.toString();
                } else {
                    response = "Error: " + responseCode;
                }

                connection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return response;
        }
        @Override
        protected void onPostExecute(String response) {
            // 서버로부터의 응답 처리
            Toast.makeText(Order1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }

    private class SendDataToServerTask2 extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            String data = params[0];
            String response = null;

            try {
                URL url = new URL(SERVER_URL1_2);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(data.getBytes());
                outputStream.flush();
                outputStream.close();

                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String line;
                    StringBuilder stringBuilder = new StringBuilder();

                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }

                    reader.close();
                    response = stringBuilder.toString();
                } else {
                    response = "Error: " + responseCode;
                }

                connection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return response;
        }
        @Override
        protected void onPostExecute(String response) {
            // 서버로부터의 응답 처리
            Toast.makeText(Order1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }
    private class SendDataToServerTask3 extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            String data = params[0];
            String response = null;

            try {
                URL url = new URL(SERVER_URL2_1);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(data.getBytes());
                outputStream.flush();
                outputStream.close();

                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String line;
                    StringBuilder stringBuilder = new StringBuilder();

                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }

                    reader.close();
                    response = stringBuilder.toString();
                } else {
                    response = "Error: " + responseCode;
                }

                connection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return response;
        }
        @Override
        protected void onPostExecute(String response) {
            // 서버로부터의 응답 처리
            Toast.makeText(Order1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }
    private class SendDataToServerTask4 extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            String data = params[0];
            String response = null;

            try {
                URL url = new URL(SERVER_URL2_2);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(data.getBytes());
                outputStream.flush();
                outputStream.close();

                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String line;
                    StringBuilder stringBuilder = new StringBuilder();

                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }

                    reader.close();
                    response = stringBuilder.toString();
                } else {
                    response = "Error: " + responseCode;
                }

                connection.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return response;
        }
        @Override
        protected void onPostExecute(String response) {
            // 서버로부터의 응답 처리
            Toast.makeText(Order1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }*/
    public void setreservedata(String responseData){
        reserve_data.setText(responseData);
    }
}