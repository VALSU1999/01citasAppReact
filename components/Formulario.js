import React,{useState} from 'react';
//TouchableHighlight => nos sirvira para crear un boton
//TextInput => es un input para el formulario
//Button => nos servira para usar la fecha
//Alert => para usar la alerta
//ScrollView => nos sirve para que agreguemos un scroll
import {Text,StyleSheet,View, TextInput, Button,TouchableHighlight, Alert, ScrollView} from 'react-native';
//importamos el componente para poder usar las fecha y horas
import DateTimePickerModal from "react-native-modal-datetime-picker";
//shortid => nos ayuda a generar ID
import shortid from 'shortid';

const Formulario = ({citas,setCitas,guardarMostrarform}) => {

    //los demas useState para los campos
    const[paciente,guardarPaciente] = useState('');
    const[propietario,guardarPropietario] = useState('');
    const[telefono,guardarTelefono] = useState('');
    const[sintomas,guardarSintomas] = useState('');

    //leyendo la fecha y hora
    const[fecha,guardarFecha] = useState('');
    const[hora,guardarHora] = useState('');
    //useState para la Fecha
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //useState para la Hora
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    //mostrar fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    //ocultar fecha
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        //variables para formatear la fecha
        const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
        //guardar la fecha formateada
        guardarFecha(date.toLocaleDateString('es-ES',opciones));
        hideDatePicker();
    };


    //mostrar Hora
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    //ocultar Hora
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (time) => {
        //variables para formatear la HORA
        const opciones = {hour: 'numeric', minute:'2-digit'};
        //guardar la HORA formateada
        guardarHora(time.toLocaleString('es-US',opciones));
        hideTimePicker();
    };

    //crear nueva cita submit
    const crearNuevaCita = () => {
        //validar 
        if(paciente.trim() === '' ||   propietario.trim() === '' ||  telefono.trim() === '' ||  fecha.trim() === '' ||  hora.trim() === '' ||  sintomas.trim() === ''){
            //mostra alerta
            mostrarAlerta();
            return;
        }

        //Crear una nueva cita
        const cita = {paciente, propietario, telefono, fecha, hora,sintomas};
        //generar el id a la cita
        cita.id = shortid.generate();

        //console.log(cita);
        //agregar al state de citas
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);
        //ocultar el formulario
        guardarMostrarform(false);
        //recetear el formulario

    }

    //muestra la alerta si falla la validacion
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'todos los campos son obligatorios',// mensaje
            [{
                text: 'OK' //Arreglo de botones
            }]
        )
    };

    return (  
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => guardarPaciente(texto) } 
                />
            </View>
            
            <View>
                <Text style={styles.label}>Dueño: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => guardarPropietario(texto) } 
                />
            </View>
            <View>
                <Text style={styles.label}>Teléfono Contacto: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => guardarTelefono(texto) } 
                    keyboardType='numeric'
                />
            </View>
            <View>
                <Text style={styles.label}>Fecha: </Text>
                <Button title="Mostrar selector de fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS="Eligir la Fecha"
                    cancelTextIOS='Cancelar'
                    confirmTextIOS='Confirmar'
                />
                <Text style={styles.parrafo}>{fecha}</Text>
            </View>
            <View>
                <Text style={styles.label}>Hora: </Text>
                <Button title="Mostrar selector de hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    headerTextIOS="Eligir la Hora"
                    cancelTextIOS='Cancelar'
                    confirmTextIOS='Confirmar'
                />
                <Text style={styles.parrafo}>{hora}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas: </Text>
                <TextInput
                    multiline
                    style={styles.input}
                    onChangeText={texto => guardarSintomas(texto) } 
                    
                />
            </View>
            <View>
                <TouchableHighlight onPress={()=>crearNuevaCita()} style={styles.botonSubmit}>
                    <Text style={styles.textoSubmit}>Submit</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario:{
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal:'2.5%'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        color:'#131313',
    },
    parrafo: {
        fontSize: 18,
        marginTop: 10,
        paddingLeft: 15,
        color:'#131313',
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
        color:'#131313'
    },
    botonSubmit: {
        padding: 10,
        backgroundColor: '#7D024E' ,
        marginVertical: 10,
        marginBottom: 40
    },
    textoSubmit:{
        color:"#FFF",
        textAlign: 'center',
        fontWeight:'bold'
    }
})
 
export default Formulario;