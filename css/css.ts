import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   outer: {
      alignContent: 'center',
      flex: 1,
      justifyContent: 'center',
   },
   inner: {
      alignSelf: 'center',
      flexGrow: 1,
      minWidth: '16em',
   },
   header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: '2em',
      marginTop: '1em',
      textAlign: 'center',
   },
   inputButton: {
      marginBottom: '1em',
   },
   input: {
      backgroundColor: 'white',
      borderColor: '#ccc',
      borderRadius: 4,
      borderWidth: 1,
      marginBottom: '1em',
      paddingHorizontal: 12,
      paddingVertical: 8,
   },
   error: {
      backgroundColor: '#cc2a24',
      borderColor: '#ccc',
      borderRadius: 4,
      borderWidth: 1,
      boxSizing: 'border-box',
      color: 'white',
      marginBottom: '1em',
      overflowWrap: 'break-word',
      paddingVertical: 8,
      textAlign: 'center',
      wordWrap: 'break-word',
   },
   link: {
      color: 'blue',
      marginBottom: '1em',
   },
});
