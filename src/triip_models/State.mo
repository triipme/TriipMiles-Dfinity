import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Prelude "mo:base/Prelude";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";

import Types "Types";

module{
  public type Map<K,V> = TrieMap.TrieMap<K,V>;
  
  public type State = {
    admin : Map<Principal,Types.Admin>;
    profiles : Map<Principal,Types.Profile>;
    travelplans : Map<Text,Types.TravelPlan>;
    proofs : Map<Text,Types.ProofTP>;
    vetted : Map<Text,Types.Vetted>;
    kycs : Map<Principal,Types.KYCs>;
    prizes: Map<Text,Types.Prize>;
    wheels : Map<Text,Types.LuckyWheel>;
    spinresults : Map<Text,Types.SpinResult>
  };
  
  public func empty() : State { 
    {
      admin = TrieMap.TrieMap<Principal,Types.Admin>(Principal.equal, Principal.hash);
      profiles = TrieMap.TrieMap<Principal,Types.Profile>(Principal.equal, Principal.hash);
      travelplans = TrieMap.TrieMap<Text,Types.TravelPlan>(Text.equal,Text.hash);
      proofs = TrieMap.TrieMap<Text,Types.ProofTP>(Text.equal,Text.hash);
      vetted = TrieMap.TrieMap<Text,Types.Vetted>(Text.equal,Text.hash);
      kycs = TrieMap.TrieMap<Principal,Types.KYCs>(Principal.equal,Principal.hash);
      prizes = TrieMap.TrieMap<Text,Types.Prize>(Text.equal,Text.hash);
      wheels = TrieMap.TrieMap<Text,Types.LuckyWheel>(Text.equal,Text.hash);
      spinresults = TrieMap.TrieMap<Text,Types.SpinResult>(Text.equal,Text.hash);
    };
  };
}