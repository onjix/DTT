package com.example.dtt_r5;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.ColorStateList;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class MainActivity1 extends AppCompatActivity {

    private static final int REQUEST_CODE_ORDER1 = 1;
    private static final int REQUEST_CODE_ORDER2 = 2;
    private Button table1, table2, btn_sc, btn_rd;
    private EditText reserve_data;

    private static final int REQUEST_ENABLE_BT = 10;
    private BluetoothAdapter bluetoothAdapter;
    private Set<BluetoothDevice> devices;
    private BluetoothDevice bluetoothDevice;
    private BluetoothSocket bluetoothSocket = null;
    private OutputStream outputStream = null;
    private InputStream inputStream = null;
    private Thread workerThread = null;
    private boolean stopWorker = false;
    private byte[] readBuffer;
    private int readBufferPosition;
    private Handler handler = new Handler();

    private static final String SERVER_URL1 = "http://192.168.55.182:8080/table/1/changeY/1";
    private static final String SERVER_URL2 = "http://192.168.55.182:8080/table/1/changeN/1";
    private static final String SERVER_URL3 = "http://192.168.55.182:8080/table/1/changeS/1";

    //private final reservation_data reservation_data;

    /*public MainActivity1(com.example.dtt_r5.reservation_data reservation_data) {
        this.reservation_data = reservation_data;
    }*/


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        setContentView(R.layout.activity_main1);
        table1 = findViewById(R.id.btn_table1);
        table2 = findViewById(R.id.btn_table2);
        btn_sc = findViewById(R.id.btn_bt);
        btn_rd = findViewById(R.id.btn_getreserve);
        //reserve_data = findViewById(R.id.reserve_info_main);

        /*btn_rd.setOnClickListener(new View.OnClickListener() { //갱신 클릭시
            @Override
            public void onClick(View v) {
                reservation_data.receiveReservationInfoForStore(1);
            }
        });*/

        table1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity1.this, Order1.class);
                intent.putExtra("data", 1); // "data"라는 키로 1을 전달
                startActivityForResult(intent, REQUEST_CODE_ORDER1);
            }
        });

        table2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity1.this, Order2.class);
                intent.putExtra("data", 1);
                startActivityForResult(intent, REQUEST_CODE_ORDER2);
            }
        });

        String[] permissionList = {
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.BLUETOOTH,
                Manifest.permission.BLUETOOTH_ADMIN,
                Manifest.permission.BLUETOOTH_CONNECT
        };

        ActivityCompat.requestPermissions(this, permissionList, 1);

        btn_sc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
                if (bluetoothAdapter == null) {
                    Toast.makeText(getApplicationContext(), "블루투스를 지원하지 않는 기기입니다.", Toast.LENGTH_SHORT).show();
                } else {
                    if (bluetoothAdapter.isEnabled()) {
                        selectBluetoothDevice();
                    } else {
                        Intent intent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);

                        startActivityForResult(intent, REQUEST_ENABLE_BT);
                    }
                }

            }
        });

    }

    int state = 2, total = 0;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK) {
            state = data.getIntExtra("state", 0);
            total = data.getIntExtra("total", 0);
            switch (requestCode) {
                case REQUEST_CODE_ORDER1:
                    setTable1ButtonColor(state, total);
                    break;
                case REQUEST_CODE_ORDER2:
                    setTable2ButtonColor(state, total);
                    break;
            }
        }
    }

    public void setTable1ButtonColor(int state, int total) {
        if (state == 1) {
            table1.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_red_light)));
        } else if (state == 2) {
            table1.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_green_light)));
        }
        table1.setText("TABLE 1\n￦" + total);
    }

    public void setTable2ButtonColor(int state, int total) {
        if (state == 1) {
            table2.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_red_light)));
        } else if (state == 2) {
            table2.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_green_light)));
        }
        table2.setText("TABLE 2\n￦" + total);
    }

    int pairedDeviceCount;

    public void selectBluetoothDevice() {

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        devices = bluetoothAdapter.getBondedDevices();
        pairedDeviceCount = devices.size();
        if (pairedDeviceCount == 0) {
            Toast.makeText(getApplicationContext(), "페어링된 블루투스 장치가 없습니다.", Toast.LENGTH_SHORT).show();
        } else {
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("페어링된 블루투스 장치 목록");

            List<String> list = new ArrayList<>();
            for (BluetoothDevice bluetoothDevice : devices) {
                list.add(bluetoothDevice.getName());
            }
            list.add("취소");

            final CharSequence[] charSequences = list.toArray(new CharSequence[list.size()]);
            builder.setItems(charSequences, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    if (which == pairedDeviceCount) {
                        // 취소를 선택한 경우 처리 코드 작성
                    } else {
                        connectDevice(charSequences[which].toString());
                    }
                }
            });
            builder.setCancelable(false);
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
        }
    }

    public void connectDevice(String deviceName) {
        for (BluetoothDevice tempDevice : devices) {

            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                return;
            }
            if (deviceName.equals(tempDevice.getName())) {
                bluetoothDevice = tempDevice;
                break;
            }
        }

        Toast.makeText(getApplicationContext(), bluetoothDevice.getName() + "에 연결 중...", Toast.LENGTH_SHORT).show();
        UUID uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

        try {
            bluetoothSocket = bluetoothDevice.createRfcommSocketToServiceRecord(uuid);
            bluetoothSocket.connect();
            Toast.makeText(getApplicationContext(), bluetoothDevice.getName() + "연결되었습니다.", Toast.LENGTH_SHORT).show();

            outputStream = bluetoothSocket.getOutputStream();
            inputStream = bluetoothSocket.getInputStream();
            beginListenForData();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void beginListenForData() {
        final byte delimiter = '\n';

        stopWorker = false;
        readBufferPosition = 0;
        readBuffer = new byte[1024];

        workerThread = new Thread(new Runnable() {
            public void run() {
                while (!Thread.currentThread().isInterrupted() && !stopWorker) {
                    try {
                        int bytesAvailable = inputStream.available();

                        if (bytesAvailable > 0) {
                            byte[] packetBytes = new byte[bytesAvailable];
                            inputStream.read(packetBytes);
                            for (int i = 0; i < bytesAvailable; i++) {
                                byte b = packetBytes[i];
                                if (b == delimiter) {
                                    byte[] encodedBytes = new byte[readBufferPosition];
                                    System.arraycopy(readBuffer, 0, encodedBytes, 0, encodedBytes.length);
                                    final String data = new String(encodedBytes, "US-ASCII");
                                    readBufferPosition = 0;

                                    handler.post(new Runnable() {
                                        public void run() {
                                            int sensorValue = Integer.parseInt(data.trim());

                                            if (sensorValue > 100 ) {//  압력값 100이상시 테이블 색상 변경
                                                table1.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_purple)));
                                                Toast.makeText(getApplicationContext(), "현재 센서 데이터: " + sensorValue, Toast.LENGTH_SHORT).show();
                                                sendDataToServer(3); //서버로 점유중 데이터 전송
                                            } else {
                                                if(state==1){
                                                    sendDataToServer(1);
                                                    setTable1ButtonColor(state, total);
                                                } else if(state==2){
                                                    sendDataToServer(2);
                                                    setTable1ButtonColor(state, total);
                                                }

                                            }
                                        }
                                    });
                                } else {
                                    readBuffer[readBufferPosition++] = b;
                                }
                            }
                        }
                    } catch (IOException ex) {
                        stopWorker = true;
                    }
                }
            }
        });

        workerThread.start();
    }

    private void sendDataToServer(int con) {
        // 서버로 전송할 데이터
        String data_t = "1";

        new SendDataToServerTask().execute(con, data_t);

        // AsyncTask를 사용하여 백그라운드에서 HTTP POST 요청을 보냄

        /*if (con==1){
            new SendDataToServerTask1().execute(data_t);
        }
        if (con==2){
            new SendDataToServerTask2().execute(data_t);
        }

        if (con==3){
            new SendDataToServerTask3().execute(data_t);
        }*/
    }

    private class SendDataToServerTask extends AsyncTask<Object, Void, String> {
        @Override
        protected String doInBackground(Object... params) {
            int con = (int) params[0];
            String data = (String) params[1];
            String response = null;

            try {
                URL url;
                // con 값에 따라 서버 URL 설정
                if (con == 1) {
                    url = new URL(SERVER_URL1);
                } else if (con == 2) {
                    url = new URL(SERVER_URL2);
                } else if (con == 3) {
                    url = new URL(SERVER_URL3);
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
            Toast.makeText(MainActivity1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }

    /*private class SendDataToServerTask1 extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... params) {
            String data = params[0];
            String response = null;
            try {
                URL url = new URL(SERVER_URL1);
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
            Toast.makeText(MainActivity1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }
    private class SendDataToServerTask2 extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... params) {
            String data = params[0];
            String response = null;
            try {
                URL url = new URL(SERVER_URL2);
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
            Toast.makeText(MainActivity1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }
    private class SendDataToServerTask3 extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... params) {
            String data = params[0];
            String response = null;
            try {
                URL url = new URL(SERVER_URL3);
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
            Toast.makeText(MainActivity1.this, "서버 응답: " + response, Toast.LENGTH_SHORT).show();
        }
    }*/
    public void setreservedata(String responseData){
        reserve_data.setText(responseData);
    }
}