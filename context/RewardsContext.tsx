import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Code, Reward } from "../types";
import Loader from "../components/shared/Loader";

const REWARDS_KEY = "@rewards_data";
const CODES_KEY = "@codes_data";

interface Context {
  rewards: Reward[];
  codes: Code[];
  loading: boolean;
  addReward: (reward: Reward) => Promise<void>;
  removeReward: (id: string) => Promise<void>;
  editReward: (updatedReward: Reward) => Promise<void>;
  addCode: (code: Code) => Promise<void>;
  removeCode: (id: string) => Promise<void>;
  editCode: (updatedCode: Code) => Promise<void>;
  markCodeUsed: (codeStr: string) => Promise<void | Code>;
}

const RewardsContext = createContext<Context | undefined>(undefined);

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [codes, setCodes] = useState<Code[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const rewardsData = await AsyncStorage.getItem(REWARDS_KEY);
        const codesData = await AsyncStorage.getItem(CODES_KEY);
        if (rewardsData) setRewards(JSON.parse(rewardsData));
        if (codesData) setCodes(JSON.parse(codesData));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadRewards();
  }, []);

  const saveRewards = async (newRewards: Reward[]) => {
    try {
      await AsyncStorage.setItem(REWARDS_KEY, JSON.stringify(newRewards));
      setRewards(newRewards);
    } catch (e) {
      console.error("Error saving rewards", e);
    }
  };

  const saveCodes = async (newCodes: Code[]) => {
    try {
      await AsyncStorage.setItem(CODES_KEY, JSON.stringify(newCodes));
      setCodes(newCodes);
    } catch (e) {
      console.error("Error saving codes", e);
    }
  };

  const addReward = async (reward: Reward) => {
    await saveRewards([...rewards, reward]);
  };

  const removeReward = async (id: string) => {
    await saveRewards(rewards.filter((r) => r.id !== id));
  };

  const editReward = async (updatedReward: Reward) => {
    const updatedRewards = rewards.map((r) =>
      r.id === updatedReward.id ? updatedReward : r
    );

    await saveRewards(updatedRewards);
  };

  const addCode = async (code: Code) => {
    await saveCodes([...codes, code]);
  };

  const removeCode = async (id: string) => {
    await saveCodes(codes.filter((r) => r.id !== id));
  };

  const editCode = async (updatedCode: Code) => {
    const updatedCodes = codes.map((r) =>
      r.id === updatedCode.id ? updatedCode : r
    );
    await saveCodes(updatedCodes);
  };

  const markCodeUsed = async (codeStr: string) => {
    const code = codes.find((code) => code.code === codeStr && !code.used);
    if (!code) return;
    const newCodes = codes.map((c) =>
      c.code === codeStr ? { ...c, used: true } : c
    );
    await saveCodes(newCodes);
    return code;
  };

  if (loading) return <Loader />;

  return (
    <RewardsContext.Provider
      value={{
        rewards,
        codes,
        loading,
        addReward,
        removeReward,
        editReward,
        addCode,
        removeCode,
        editCode,
        markCodeUsed,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error("useRewards must be used within a RewardsProvider");
  }
  return context;
}
