import { Text, StyleSheet, View } from "react-native";
import Header from "../components/shared/Header";
import ValidCode from "../components/home/ValidCode";

export default function Home() {
  return (
    <>
      <Header title="¡Hola, Cliente!" subtitle="Compra y gana puntos" />
      <ValidCode />
    </>
  );
}
