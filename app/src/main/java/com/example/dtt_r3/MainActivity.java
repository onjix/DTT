package com.example.dtt_r3;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button table1 = findViewById(R.id.btn_table1);
        Button table2 = findViewById(R.id.btn_table2);

        table1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, Order1.class );
                startActivity(intent);
                finish();
            }
        });

        table2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, Order2.class );
                startActivity(intent);
                finish();
            }
        });

        Intent intent1 = getIntent();

        //DB에서 테이블 상태 정보 갱신


        //DB에서 받아온 데이터에 따라 테이블  상태 변경


        int confirmValue1 = intent1.getIntExtra("confirm1", 0);
        if (confirmValue1==1){
            table1.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_red_light)));
        }
        int confirmValue2 = intent1.getIntExtra("confirm2", 0);
        if (confirmValue2==1){
            table2.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_red_light)));
        }
        int payValue1 = intent1.getIntExtra("pay1", 0);
        if (payValue1==1){
            table1.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_green_light)));
        }
        int payValue2 = intent1.getIntExtra("pay2", 0);
        if (payValue2==1){
            table2.setBackgroundTintList(ColorStateList.valueOf(getResources().getColor(android.R.color.holo_green_light)));
        }

    }
}