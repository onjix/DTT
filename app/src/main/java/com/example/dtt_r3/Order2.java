package com.example.dtt_r3;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Order2 extends AppCompatActivity {
    private Button confirm, pay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);
        confirm = findViewById(R.id.btn_confirm);
        pay = findViewById(R.id.btn_pay);

        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Order2.this, MainActivity.class);
                intent.putExtra("confirm2", 1);
                startActivity(intent);
                finish();
            }
        });

        pay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Order2.this, MainActivity.class);
                intent.putExtra("pay2", 1);
                startActivity(intent);
                finish();
            }
        });
    }
}