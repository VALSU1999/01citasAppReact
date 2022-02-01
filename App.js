
import React, {useState}from 'react';
//StyleSheet => nos sirve para dar style
//Text => nos sirve para escribir texto
//View => viene hacer como el contener central
//FlatList => nos ayudara a listar los datos
//Platform => es agregar codigo especifico para un dispositivo
//TouchableWithoutFeedback => nos sirve para encapsulamos  todo la estructura 
//Keyboard => nos ayudara a cerrar el teclado
import {Text,StyleSheet,View, FlatList,TouchableHighlight,Platform,TouchableWithoutFeedback,Keyboard} from 'react-native';

import Formulario from './components/Formulario';

import Cita from './components/Cita'
const App = () => {

  //condicion para mostrar cita
  const [mostrarform,guardarMostrarform] = useState(false);


  //definir el state de citas
  const [citas,setCitas] = useState([]);

  const eliminarPaciente = id =>{
    setCitas((citasActuales) =>{
      return citasActuales.filter(cita => cita.id !== id);
    })
  };
  
  //funcion para mostrar y ocular formulario
  const mostrarFormulario = ()=>{
    guardarMostrarform(!mostrarform);
  }

  //ocultar el teclado
  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo} >Administracion de Citas</Text>
        
        <View>
              <TouchableHighlight onPress={()=>mostrarFormulario()} style={styles.btnMostrar}>
                  <Text style={styles.textMostrar}>{mostrarform? 'Lista de Citas':'Crear nueva Cita'} </Text>
            </TouchableHighlight>
        </View>

        {mostrarform ? (
          <>
            <Text style={styles.titulo} >Crear nueva cita</Text>
            
            <Formulario
              citas={citas}
              setCitas={setCitas}
              guardarMostrarform={guardarMostrarform}
            />
            
          </>
        ):(
          <>
            <Text style={styles.titulo} >{citas.length > 0 ? 'Administra tus Citas': 'No hay citas, agrega una cita'}</Text>
            <FlatList
              data={citas}
              renderItem={({item})=> <Cita cita = {item} eliminarPaciente = {eliminarPaciente}/>}
              keyExtractor={cita=>cita.id}
            />
          </>
        )}
        
      </View>
    </TouchableWithoutFeedback>
  );
};

//creamos style
const styles = StyleSheet.create({

  contenedor:{
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo:{
    color: '#FFF',
    textAlign:'center',
    //agregando codigo especificio para iOS
    marginTop: Platform.OS ==='ios'?40:20 ,
    fontSize:24,
    fontWeight:'bold',
    marginBottom: 10
  },
  btnMostrar: {
    padding: 10,
    backgroundColor: '#7D024E' ,
    marginVertical: 5
  },
  textMostrar:{
    color:"#FFF",
    textAlign: 'center',
    fontWeight:'bold'
}
})
export default App;
