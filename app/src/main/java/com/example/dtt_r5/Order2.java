package com.example.dtt_r5;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class Order2 extends AppCompatActivity {
    private Button confirm, pay;
    private EditText TotalPrice;
    private EditText pd1, pd2, pd3, pd4, pd5, pd6, pd7, pd8, pd9;

    private int total = 0;
    private int pd1_price=0, pd2_price=0,  pd3_price=0, pd4_price=0, pd5_price=0, pd6_price=0, pd7_price=0, pd8_price=0, pd9_price=0;
    private int pd1_num=0, pd2_num=0, pd3_num=0, pd4_num=0, pd5_num=0, pd6_num=0, pd7_num=0, pd8_num=0, pd9_num=0;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);
        confirm = findViewById(R.id.btn_confirm);
        pay = findViewById(R.id.btn_pay);

        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent resultIntent = new Intent();
                resultIntent.putExtra("state", 1);
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
}