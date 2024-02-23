import { StyleSheet } from 'react-native';
import Colors from './Colors';

const RecordCss = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        padding: 3,
      },
      tableHeader: {
        flexDirection: "row",
        backgroundColor: Colors.LIGHTBLACK,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
      },
      headerCell: {
        flex: 1,
        // fontWeight: "bold",
        textAlign: 'center',
        color: Colors.WHITE,
        fontFamily: 'outfit-bold',
      },
      tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
      },
      tableCell: {
        flex: 1,
        fontSize: 16,
        color: Colors.BLACK,
        textAlign: 'center',
        fontFamily: 'outfit'
      },
      scrollContainer: {
        height: 270,
      },
  });

  export default RecordCss;