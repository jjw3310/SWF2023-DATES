use serde::{Serialize, Deserialize};
use serde_json;
use std::fs::File;
use std::io::{self, Write};

// 개인정보 구조체 정의
#[derive(Serialize, Deserialize)]
struct PersonalInfo {
    name: String,
    age: u32,
    email: String,
    phone_number: String,
}

fn main() {
    // 개인정보 입력 받기
    let personal_info = input_personal_info();

    // 개인정보를 JSON 문자열로 변환
    let json_string = serde_json::to_string_pretty(&personal_info)
        .expect("Failed to convert to JSON string.");

    // JSON 파일로 저장
    let filename = "personal_info.json";
    match File::create(filename) {
        Ok(mut file) => {
            file.write_all(json_string.as_bytes())
                .expect("Failed to write to file.");
            println!("Personal info saved to {}", filename);
        }
        Err(e) => eprintln!("Error creating file: {}", e),
    }
}

// 개인정보 입력 함수
fn input_personal_info() -> PersonalInfo {
    println!("Enter your name:");
    let name = read_line();

    println!("Enter your age:");
    let age = read_line().parse().expect("Invalid age.");

    println!("Enter your email:");
    let email = read_line();

    println!("Enter your phone number:");
    let phone_number = read_line();

    PersonalInfo {
        name,
        age,
        email,
        phone_number,
    }
}

// 라인 입력 함수
fn read_line() -> String {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line.");
    input.trim().to_string()
}