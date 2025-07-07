import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/shared/Loader";

interface Context {
  points: number;
  addPoints: (amount: number) => Promise<void>;
  deductPoints: (amount: number) => Promise<void>;
  loading: boolean;
}

const PointsContext = createContext<undefined | Context>(undefined);

const POINTS_KEY = "@user_points";

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPoints() {
      try {
        const storedPoints = await AsyncStorage.getItem(POINTS_KEY);
        if (storedPoints !== null) {
          setPoints(parseInt(storedPoints));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadPoints();
  }, []);

  const addPoints = async (amount: number) => {
    const newPoints = points + amount;
    try {
      await AsyncStorage.setItem(POINTS_KEY, newPoints.toString());
      setPoints(newPoints);
    } catch (error) {
      console.log(error);
    }
  };

  const deductPoints = async (amount: number) => {
    const newPoints = points - amount;
    try {
      await AsyncStorage.setItem(POINTS_KEY, newPoints.toString());
      setPoints(newPoints);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <PointsContext.Provider
      value={{ points, addPoints, deductPoints, loading }}
    >
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
}
