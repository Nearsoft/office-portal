#include <RCSwitch.h>
 
//Instacia a Biblioteca
RCSwitch mySwitch = RCSwitch();
 
 
//Conexao 1 (IN1) do motor 1 (M1) = 1N1M1
int led=13;
 
 
//variavel responsavel em receber os dados do RF
int value =-1;
 
 
void setup() {
 
//Seta os Pinos dos Motores como Saida
pinMode(led,OUTPUT);
 
 
 
 
Serial.begin(9600);
// delay para estabilizacao do Sinal
///////delay(500);
delay(50);
 
//Seta como Receptor/ O "0" é para não interromper, deixar continuo
//O Pino padrão é o 2
mySwitch.enableReceive(0);
 
}
 
void loop() {
 
 
//Quado estiver sinal disponivel
if (mySwitch.available()) {
 
//recebe na variavel value o Status
value = mySwitch.getReceivedValue();
 
 
if (value == 0) {
          Serial.println("Codigo desconhecido");
         
     
}
       
 
//========================================
if(value ==2){  
    Serial.println(mySwitch.getReceivedValue());
    digitalWrite(led, LOW);
}
       
       
  if(value ==1){  
      Serial.println(mySwitch.getReceivedValue());  
      digitalWrite(led, HIGH);
      
  }

 
 mySwitch.resetAvailable();
       
  }
}
//========================================
