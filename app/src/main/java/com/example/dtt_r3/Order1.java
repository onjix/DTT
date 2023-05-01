package com.example.dtt_r3;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Order1 extends AppCompatActivity {
    private Button confirm, pay;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order1);
        confirm = findViewById(R.id.btn_confirm);
        pay = findViewById(R.id.btn_pay);

        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Order1.this, MainActivity.class);
                intent.putExtra("confirm1", 1);
                startActivity(intent);
                finish();
            }
        });

        pay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Order1.this, MainActivity.class);
                intent.putExtra("pay1", 1);
                startActivity(intent);
                finish();
            }
        });

    }
}