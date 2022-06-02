import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import UUIDGenerator "mo:uuid/UUID";
import AsyncSource "mo:uuid/async/SourceV4";

import Types "../../../triip_models/Types";
import State "../../../triip_models/State";
import MemoryCard "../../../triip_models/model/games/MemoryCard";

module MemoryCardController {
  type Level = MemoryCard.Level;
  type LevelObj = (Text,Level);
  type Player = MemoryCard.Player;

  public func initLevels() : async [LevelObj]{
    var ae = AsyncSource.Source();
    var volcabularies = [
      { volcabulary = [
          ("М'ясо (m'yaso)","Meat"),
          ("Хліб (khlib)","Bread"),
          ("Мед (mud)","Honey"),
          ("Морозиво (morozivo)","Ice cream"),
          ("Салат (salat)","Salad"),
          ("Сендвіч (sendvich)","Sandwich"),
          ("Риба (ryba)","Fish"),
          ("Овочі (ovuchi)","Vegetables"),
      ]},
      { volcabulary = [
        ("Кіт (kit)","Cat"),
        ("Зáєць (zayetsch)","Hare"),
        ("Собáка (sobaka)","Dog"),
        ("Миша (musha)","Mouse"),
        ("Ведмідь (vudmid)","Bear"),
        ("Свиня (svenya)","Pig"),
        ("Корови (korovoy)","Cows"),
        ("Кінь (keen)","Horse"),
        ("Павук (pavuk)","Spider"),
        ("Тварина (tvarayna)","Animal"),
        ("Птах (ptah)","Bird"),
        ("Слон (slon)","Elephant"),
      ]},
      { volcabulary = [
        ("Полуниця (Polunytsya)","Strawberry"),
        ("ківі (kivi)","Kiwi"),
        ("яблуко (yabluko)","Apple"),
        ("Помаранчевий (Pomaranchevyy)","Orange"),
        ("брокколі (brokkoli)","Broccoli"),
        ("червоний перець (chervonyy peretsʹ)","Red pepper"),
        ("авокадо (avokado)","Avocado"),
        ("Кавун (Kavun)","Watermelon"),
        ("банан (banan)","Banana"),
        ("Гриб (Hryb)","Mushroom"),
        ("огірок (ohirok)","Cucumber"),
        ("ананас (ananas)","Pineapple"),
        ("Цибуля (Tsybulya)","Onion"),
        ("листя салату (lystya salatu)","Lettuce"),
        ("морква (morkva)","Carrot"),
        ("помідор (pomidor)","Tomato"),
      ]}
    ];
    var levels : [LevelObj] = [];
    for((v) in Iter.fromArray(volcabularies)){
      let id = await ae.new();
      let uuid : Text = UUIDGenerator.toText(id);
      levels := Array.append<LevelObj>(levels, [(uuid, v)])
    };
    return levels;
  };
}