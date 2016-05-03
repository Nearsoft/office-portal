//importa a biblioteca RCSwitch
#include <RCSwitch.h>
 
 
//Instacia a Biblioteca RF
RCSwitch mySwitch = RCSwitch();
 
 
//Constante para os pinos dos botoes
const int button = 2;
 
 
 
//variaveis de Controle de cada botao
int buttonState = 0;
 
 
void setup() {
 
//seta os pinos dos botoes como saida
pinMode(button, INPUT);
 
 
//seta os pinos como HIGH (Alto)
digitalWrite(button, 1);
 
 
Serial.begin(9600);
 
// Seta como habititado para enviar dados RF o pino 10
mySwitch.enableTransmit(10);
delay(50);
 
}
 
void loop(){
//Le o Status dos botoes
buttonState = digitalRead(button);
 
 
 
if (buttonState == 0) {
  Serial.println("2");
    mySwitch.send(2, 24);
}
 
 if (buttonState == 1) {
  Serial.println("1");
    mySwitch.send(1, 24);
}
 

 
 

}
