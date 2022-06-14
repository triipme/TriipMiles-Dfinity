import Prelude "mo:base/Prelude";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";

import Types "Types";

module{
  private type Map<K, V> = TrieMap.TrieMap<K, V>;
  public type State = {
    admin : Map<Principal, Types.Admin>;
    profiles : Map<Principal, Types.Profile>;
    travelplans : Map<Text, Types.TravelPlan>;
    proofs : Map<Text, Types.ProofTP>;
    vetted : Map<Text, Types.Vetted>;
    kycs : Map<Principal, Types.KYCs>;
    games : {
      memory_card : {
        games : Map<Text, Types.MemoryCardGame>;
        stages : Map<Text, Types.MemoryCardStage>;
        cards : Map<Text, Types.MemoryCard>;
        players : Map<Text, Types.MemoryCardPlayer>;
        rewards : Map<Text, Types.MemoryCardReward>;
      };
      memory_card_engine : {
        players : Map<Text, Types.MemoryCardEnginePlayer>;
        rewards : Map<Text, Types.MemoryCardEngineReward>;
      }
    };
    prizes: Map<Text, Types.Prize>;
    wheels : Map<Text, Types.LuckyWheel>;
    spinresults : Map<Text, Types.SpinResult>;
    transactions : Map<Text, Types.TxRecord>;
  };

  public func empty() : State {
    {
      admin = TrieMap.TrieMap<Principal, Types.Admin>(Principal.equal, Principal.hash);
      profiles = TrieMap.TrieMap<Principal, Types.Profile>(Principal.equal, Principal.hash);
      travelplans = TrieMap.TrieMap<Text, Types.TravelPlan>(Text.equal, Text.hash);
      proofs = TrieMap.TrieMap<Text, Types.ProofTP>(Text.equal, Text.hash);
      vetted = TrieMap.TrieMap<Text, Types.Vetted>(Text.equal, Text.hash);
      kycs = TrieMap.TrieMap<Principal, Types.KYCs>(Principal.equal, Principal.hash);
      games = {
        memory_card = {
          games = TrieMap.TrieMap<Text, Types.MemoryCardGame>(Text.equal, Text.hash);
          stages = TrieMap.TrieMap<Text, Types.MemoryCardStage>(Text.equal, Text.hash);
          cards = TrieMap.TrieMap<Text, Types.MemoryCard>(Text.equal, Text.hash);
          players = TrieMap.TrieMap<Text, Types.MemoryCardPlayer>(Text.equal, Text.hash);
          rewards = TrieMap.TrieMap<Text, Types.MemoryCardReward>(Text.equal, Text.hash);
        };
        memory_card_engine = {
          players = TrieMap.TrieMap<Text, Types.MemoryCardEnginePlayer>(Text.equal, Text.hash);
          rewards = TrieMap.TrieMap<Text, Types.MemoryCardEngineReward>(Text.equal, Text.hash);
        }
      };
      prizes = TrieMap.TrieMap<Text, Types.Prize>(Text.equal, Text.hash);
      wheels = TrieMap.TrieMap<Text, Types.LuckyWheel>(Text.equal, Text.hash);
      spinresults = TrieMap.TrieMap<Text, Types.SpinResult>(Text.equal, Text.hash);
      transactions = TrieMap.TrieMap<Text, Types.TxRecord>(Text.equal, Text.hash);
    };
  };
};