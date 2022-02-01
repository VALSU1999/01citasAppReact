import React from 'react';
//TouchableHighlight => nos sirvira para crear un boton
import {Text,StyleSheet,View,TouchableHighlight} from 'react-native';


const Cita = ({cita, eliminarPaciente}) => {

    const dialagoEliminar = id => {
        //console.log("Eliminar........",id);
        //le pasamos el id para eliminar la cita
        eliminarPaciente(id);
        
    }

    return (  
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.texto}>{cita.paciente}</Text>
            </View>  
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text  style={styles.texto}>{cita.propietario}</Text>
            </View>  
            <View>
                <Text style={styles.label}>Síntomas: </Text>
                <Text  style={styles.texto}>{cita.sintomas}</Text>
            </View>  
            <View>
                <TouchableHighlight onPress={()=>dialagoEliminar(cita.id)} style={styles.botonEliminar}>
                    <Text style={styles.textoEliminar}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>  
    );
}
 
//creamos style
const styles = StyleSheet.create({

    cita:{
        backgroundColor:'#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10       
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        color:'#131313',
    },
    texto: {
        fontSize: 18,
        color:'#131313',
    },
    botonEliminar: {
        padding: 10,
        backgroundColor: 'red' ,
        marginVertical: 10
    },
    textoEliminar:{
        color:"#FFF",
        textAlign: 'center',
        fontWeight:'bold'
    }

  })
export default Cita;