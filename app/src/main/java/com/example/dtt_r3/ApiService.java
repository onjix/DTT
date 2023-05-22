package com.example.dtt_r3;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("changeY/1/") // 스프링 부트 서버의 엔드포인트 URL을 설정합니다.
    Call<Void> sendDataToServer(@Body int data);
}
