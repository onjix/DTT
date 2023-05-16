package com.example.dtt_r3;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private static final int REQUEST_CODE_ORDER1 = 1;
    private static final int REQUEST_CODE_ORDER2 = 2;
    private Button table1, table2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        table1 = findViewById(R.id.btn_table1);
        table2 = findViewById(R.id.btn_table2);

        table1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, Order1.class);
                startActivityForResult(intent, REQUEST_CODE_ORDER1);
            }
        });

        table2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, Order2.class);
                startActivityForResult(intent, REQUEST_CODE_ORDER2);
            }
        });

    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK) {
            int state = data.getIntExtra("state", 0);
            int total = data.getIntExtra("total", 0);
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
        if(state == 1){ table1.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_red_light))); }
        else if(state == 2){ table1.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_green_light))); }
        table1.setText("TABLE 1\n￦"+total);
    }

    public void setTable2ButtonColor(int state, int total) {
        if(state == 1){ table2.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_red_light))); }
        else if(state == 2){ table2.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_green_light))); }
        table2.setText("TABLE 2\n￦"+total);
    }
}