import { Team } from "../interfaces/team";

interface TeamsData {
  [country: string]: {
    [teamId: string]: Team;
  };
}

const teams: TeamsData = {
  england: {
    "053980d1-9205-4f90-b581-a403851c32e0": {
      displayName: "Leicester City F.C.",
      ground: "King Power Stadium",
      id: "053980d1-9205-4f90-b581-a403851c32e0",
      location: "Leicester, England",
      logoSrc: "england/Leicester_City.svg",
      primaryColor: "#003090",
      secondaryColor: "#FDBE11",
      shortenedName: "LEI",
      sourceId: "1003",
    },
    "14a47cb1-f497-4d71-879b-b7e82c85e804": {
      displayName: "Liverpool F.C.",
      ground: "Anfield",
      id: "14a47cb1-f497-4d71-879b-b7e82c85e804",
      location: "Liverpool, England",
      logoSrc: "england/Liverpool_FC.svg",
      primaryColor: "#C8102E",
      secondaryColor: "#F6EB61",
      shortenedName: "LIV",
      sourceId: "31",
    },
    "18de8ce2-736d-4c83-b4db-c473f1a03101": {
      displayName: "Tottenham Hotspur F.C.",
      ground: "Tottenham Hotspur Stadium",
      id: "18de8ce2-736d-4c83-b4db-c473f1a03101",
      location: "London, England",
      logoSrc: "england/Tottenham_Hotspur.svg",
      primaryColor: "#132257",
      secondaryColor: "#FFFFFF",
      shortenedName: "TOT",
      sourceId: "148",
    },
    "1d97c20b-b36c-4307-b227-f11de588c955": {
      displayName: "Sheffield United F.C.",
      ground: "Bramall Lane",
      id: "1d97c20b-b36c-4307-b227-f11de588c955",
      location: "Sheffield, England",
      logoSrc: "england/Sheffield_United_FC.svg",
      primaryColor: "#EC2227",
      secondaryColor: "#010101",
      shortenedName: "SHU",
      sourceId: "350",
    },
    "3d8b2af7-a43f-43a1-9fcb-0b9c7c9b8fad": {
      displayName: "Crystal Palace F.C.",
      ground: "Selhurst Park",
      id: "3d8b2af7-a43f-43a1-9fcb-0b9c7c9b8fad",
      location: "London, England",
      logoSrc: "england/Crystal_Palace_FC.svg",
      primaryColor: "#1B458F",
      secondaryColor: "#C4122E",
      shortenedName: "CRY",
      sourceId: "873",
    },
    "4303d6fc-7c8d-4f19-aab7-37e4c64195cf": {
      displayName: "Manchester City F.C.",
      ground: "Etihad Stadium",
      id: "4303d6fc-7c8d-4f19-aab7-37e4c64195cf",
      location: "Manchester, England",
      logoSrc: "england/Manchester_City_FC.svg",
      primaryColor: "#6CABDD",
      secondaryColor: "#1C2C5B",
      shortenedName: "MCI",
      sourceId: "281",
    },
    "432b8777-b474-4ff9-bdd0-7dc41bd24e80": {
      displayName: "Southampton F.C.",
      ground: "St Mary's Stadium",
      id: "432b8777-b474-4ff9-bdd0-7dc41bd24e80",
      location: "Southampton, England",
      logoSrc: "england/FC_Southampton.svg",
      primaryColor: "#D71920",
      secondaryColor: "#130C0E",
      shortenedName: "SOU",
      sourceId: "180",
    },
    "479aa6bf-67ec-4320-a1dc-2d5b77c2f1a4": {
      displayName: "Watford F.C.",
      ground: "Vicarage Road",
      id: "479aa6bf-67ec-4320-a1dc-2d5b77c2f1a4",
      location: "Watford, England",
      logoSrc: "england/Watford.svg",
      primaryColor: "#FBEE23",
      secondaryColor: "#ED2127",
      shortenedName: "WAT",
      sourceId: "1010",
    },
    "4e34107f-ccd8-4c94-a04f-5eb8d8637533": {
      displayName: "West Ham United F.C.",
      ground: "London Stadium",
      id: "4e34107f-ccd8-4c94-a04f-5eb8d8637533",
      location: "London, England",
      logoSrc: "england/West_Ham_United_FC.svg",
      primaryColor: "#7A263A",
      secondaryColor: "#1BB1E7",
      shortenedName: "WHU",
      sourceId: "379",
    },
    "4f30eb3c-4f9d-4506-a62f-e6021429e6de": {
      displayName: "Norwich City F.C.",
      ground: "Carrow Road",
      id: "4f30eb3c-4f9d-4506-a62f-e6021429e6de",
      location: "Norwich, England",
      logoSrc: "england/Norwich_City.svg",
      primaryColor: "#00a650",
      secondaryColor: "#fff200",
      shortenedName: "NOR",
      sourceId: "1123",
    },
    "5696bf7b-3256-4937-9d6d-952da49ddee9": {
      displayName: "Arsenal F.C.",
      ground: "Emirates Stadium",
      id: "5696bf7b-3256-4937-9d6d-952da49ddee9",
      location: "London, England",
      logoSrc: "england/Arsenal_FC.svg",
      primaryColor: "#FF0000",
      secondaryColor: "#FFFFFF",
      shortenedName: "ARS",
      sourceId: "11",
    },
    "79ee152d-e7ee-4511-8d8f-f1632d7570ec": {
      displayName: "A.F.C. Bournemouth",
      ground: "Dean Court",
      id: "79ee152d-e7ee-4511-8d8f-f1632d7570ec",
      location: "Bournemouth, England",
      logoSrc: "england/AFC_Bournemouth.svg",
      primaryColor: "#DA291C",
      secondaryColor: "#000000",
      shortenedName: "BOU",
      sourceId: "989",
    },
    "8368521e-502a-4302-86d3-cf728550d1bd": {
      displayName: "Newcastle United F.C.",
      ground: "St James' Park",
      id: "8368521e-502a-4302-86d3-cf728550d1bd",
      location: "Newcastle upon Tyne, England",
      logoSrc: "england/Newcastle_United.svg",
      primaryColor: "#241F20",
      secondaryColor: "#FFFFFF",
      shortenedName: "NEW",
      sourceId: "762",
    },
    "8ecf419b-9fde-46e5-960b-9c5f7f14dc3d": {
      displayName: "Aston Villa F.C.",
      ground: "Villa Park",
      id: "8ecf419b-9fde-46e5-960b-9c5f7f14dc3d",
      location: "Birmingham, England",
      logoSrc: "england/Aston_Villa_FC.svg",
      primaryColor: "#a3c5e9",
      secondaryColor: "#7b003a",
      shortenedName: "AVL",
      sourceId: "405",
    },
    "906ce93b-8e71-409c-b459-4259fd3d35ad": {
      displayName: "Burnley F.C.",
      ground: "Turf Moor",
      id: "906ce93b-8e71-409c-b459-4259fd3d35ad",
      location: "Burnley, England",
      logoSrc: "england/Burnley_FC.svg",
      primaryColor: "#6C1D45",
      secondaryColor: "#99D6EA",
      shortenedName: "BUR",
      sourceId: "1132",
    },
    "91c704f0-77ac-4898-a8bd-9539c66ef301": {
      displayName: "Everton F.C.",
      ground: "Goodison Park",
      id: "91c704f0-77ac-4898-a8bd-9539c66ef301",
      location: "Liverpool, England",
      logoSrc: "england/Everton_FC.svg",
      primaryColor: "#003399",
      secondaryColor: "#FFFFFF",
      shortenedName: "EVE",
      sourceId: "29",
    },
    "9ad2bac0-8e7e-44cf-924e-75add32d8e5d": {
      displayName: "Wolverhampton Wanderers F.C.",
      ground: "Molineux Stadium",
      id: "9ad2bac0-8e7e-44cf-924e-75add32d8e5d",
      location: "Wolverhampton, England",
      logoSrc: "england/Wolverhampton_Wanderers.svg",
      primaryColor: "#FDB913",
      secondaryColor: "#231F20",
      shortenedName: "WOL",
      sourceId: "543",
    },
    "e96fbd1c-bbd5-4d69-a7c7-2e45f5b579cb": {
      displayName: "Brighton & Hove Albion F.C.",
      ground: "American Express Community Stadium",
      id: "e96fbd1c-bbd5-4d69-a7c7-2e45f5b579cb",
      location: "Brighton and Hove, England",
      logoSrc: "england/Brighton_&_Hove_Albion.svg",
      primaryColor: "#0057B8",
      secondaryColor: "#FFFFFF",
      shortenedName: "BHA",
      sourceId: "1237",
    },
    "f29e61a2-23f0-462b-b9c7-420b09fec5d9": {
      displayName: "Manchester United F.C.",
      ground: "Old Trafford",
      id: "f29e61a2-23f0-462b-b9c7-420b09fec5d9",
      location: "Manchester, England",
      logoSrc: "england/Manchester_United_FC.svg",
      primaryColor: "#DA291C",
      secondaryColor: "#FBE122",
      shortenedName: "MUN",
      sourceId: "985",
    },
    "f9c15363-34ad-4156-a273-12ec0f212df6": {
      displayName: "Chelsea F.C.",
      ground: "Stamford Bridge",
      id: "f9c15363-34ad-4156-a273-12ec0f212df6",
      location: "London, England",
      logoSrc: "england/Chelsea_FC.svg",
      primaryColor: "#034694",
      secondaryColor: "#FFDD00",
      shortenedName: "CHE",
      sourceId: "631",
    },
  },
  france: {
    "21274b2b-3500-4a49-971b-0a6ae9cafb58": {
      displayName: "FC Nantes",
      ground: "Stade de la Beaujoire",
      id: "21274b2b-3500-4a49-971b-0a6ae9cafb58",
      location: "Nantes, France",
      logoSrc: "france/FC_Nantes.svg",
      primaryColor: "#1b8f3a",
      secondaryColor: "#ffd600",
      shortenedName: "NAN",
      sourceId: "995",
    },
    "2507719b-e3f6-4763-a012-b3c302b2b4b8": {
      displayName: "Dijon FCO",
      ground: "Stade Gaston Gérard",
      id: "2507719b-e3f6-4763-a012-b3c302b2b4b8",
      location: "Dijon, France",
      logoSrc: "france/Dijon_FCO.svg",
      primaryColor: "#d3072a",
      secondaryColor: "#FFFFFF",
      shortenedName: "DIJ",
      sourceId: "2969",
    },
    "2b3249eb-5868-4700-8d55-cb5985e34339": {
      displayName: "FC Metz",
      ground: "Stade Saint-Symphorien",
      id: "2b3249eb-5868-4700-8d55-cb5985e34339",
      location: "Metz, France",
      logoSrc: "france/FC_Metz.svg",
      primaryColor: "#620205",
      secondaryColor: "#FFFFFF",
      shortenedName: "MTZ",
      sourceId: "347",
    },
    "2dc5c094-9b90-4f1b-911a-3f68294dad99": {
      displayName: "Lille OSC",
      ground: "Stade Pierre-Mauroy",
      id: "2dc5c094-9b90-4f1b-911a-3f68294dad99",
      location: "Lille, France",
      logoSrc: "france/Lille_OSC.svg",
      primaryColor: "#E1170A",
      secondaryColor: "#1E1A6A",
      shortenedName: "LIL",
      sourceId: "1082",
    },
    "3ba8e3a3-ba20-4ec8-b01a-a5945a56a93b": {
      displayName: "AS Saint-Étienne",
      ground: "Stade Geoffroy-Guichard",
      id: "3ba8e3a3-ba20-4ec8-b01a-a5945a56a93b",
      location: "Saint-Étienne, France",
      logoSrc: "france/AS_Saint-Etienne.svg",
      primaryColor: "#0c5025",
      secondaryColor: "#FFFFFF",
      shortenedName: "STE",
      sourceId: "618",
    },
    "3e6520d5-8a18-4bd6-8ad4-5e00f7add2e0": {
      displayName: "AS Monaco FC",
      ground: "Stade Louis II",
      id: "3e6520d5-8a18-4bd6-8ad4-5e00f7add2e0",
      location: "Fontvieille, Monaco",
      logoSrc: "france/AS_Monaco_FC.svg",
      primaryColor: "#d91920",
      secondaryColor: "#FFFFFF",
      shortenedName: "AMO",
      sourceId: "162",
    },
    "4b2a1635-9a3d-42ca-afb1-f46766b7b179": {
      displayName: "Olympique Lyonnais",
      ground: "Groupama Stadium",
      id: "4b2a1635-9a3d-42ca-afb1-f46766b7b179",
      location: "Lyon, France",
      logoSrc: "france/Olympique_Lyonnais.svg",
      primaryColor: "#FFFFFF",
      secondaryColor: "#161659",
      shortenedName: "LYO",
      sourceId: "1041",
    },
    "5e7d0f28-97c0-46f4-b733-2073f02065ef": {
      displayName: "Stade de Reims",
      ground: "Stade Auguste-Delaune",
      id: "5e7d0f28-97c0-46f4-b733-2073f02065ef",
      location: "Reims, France",
      logoSrc: "france/Stade_de_Reims.svg",
      primaryColor: "#EF1C1E",
      secondaryColor: "#FFFFFF",
      shortenedName: "REI",
      sourceId: "1421",
    },
    "64b2a17a-aa75-4171-b2b6-dfabd6083d48": {
      displayName: "Toulouse FC",
      ground: "Stadium de Toulouse",
      id: "64b2a17a-aa75-4171-b2b6-dfabd6083d48",
      location: "Toulouse, France",
      logoSrc: "france/Toulouse_FC.svg",
      primaryColor: "#492B96",
      secondaryColor: "#000000",
      shortenedName: "TOU",
      sourceId: "415",
    },
    "7e6c61aa-3e8c-4a3e-8520-523e8608070c": {
      displayName: "Paris Saint-Germain F.C.",
      ground: "Parc des Princes",
      id: "7e6c61aa-3e8c-4a3e-8520-523e8608070c",
      location: "Paris, France",
      logoSrc: "france/Paris_Saint-Germain.svg",
      primaryColor: "#004170",
      secondaryColor: "#e30613",
      shortenedName: "PSG",
      sourceId: "583",
    },
    "883b4940-1fb9-4714-9fd1-418c8ea7ed65": {
      displayName: "FC Girondins de Bordeaux",
      ground: "Matmut Atlantique",
      id: "883b4940-1fb9-4714-9fd1-418c8ea7ed65",
      location: "Bordeaux, France",
      logoSrc: "france/FC_Girondins_de_Bordeaux.svg",
      primaryColor: "#001b50",
      secondaryColor: "#FFFFFF",
      shortenedName: "BOR",
      sourceId: "40",
    },
    "a0497862-8645-4890-a4f1-10d83941ecb8": {
      displayName: "Stade Rennais F.C.",
      ground: "Roazhon Park",
      id: "a0497862-8645-4890-a4f1-10d83941ecb8",
      location: "Rennes, France",
      logoSrc: "france/Stade_Rennais_FC.svg",
      primaryColor: "#e13327",
      secondaryColor: "#000000",
      shortenedName: "REN",
      sourceId: "273",
    },
    "a0a38e6c-30e3-4ec9-9dd9-02b524217df2": {
      displayName: "Amiens SC",
      ground: "Stade de la Licorne",
      id: "a0a38e6c-30e3-4ec9-9dd9-02b524217df2",
      location: "Amiens, France",
      logoSrc: "france/Amiens_SC.svg",
      primaryColor: "#000000",
      secondaryColor: "#808080",
      shortenedName: "AMI",
      sourceId: "1416",
    },
    "a7edfa0f-eb3d-4484-8437-3886cee7a3c5": {
      displayName: "OGC Nice",
      ground: "Allianz Riviera",
      id: "a7edfa0f-eb3d-4484-8437-3886cee7a3c5",
      location: "Nice, France",
      logoSrc: "france/OGC_Nice.svg",
      primaryColor: "#FF0000",
      secondaryColor: "#1D191A",
      shortenedName: "NCE",
      sourceId: "417",
    },
    "ae1b5cf9-73b2-41ef-bc92-4715dd6a4af0": {
      displayName: "Olympique de Marseille",
      ground: "Orange Vélodrome",
      id: "ae1b5cf9-73b2-41ef-bc92-4715dd6a4af0",
      location: "Marseille, France",
      logoSrc: "france/Olympique_Marseille.svg",
      primaryColor: "#0399D7",
      secondaryColor: "#C3A53F",
      shortenedName: "OLM",
      sourceId: "244",
    },
    "cdfaf7f7-8d7c-4d35-8173-d67e238c8a71": {
      displayName: "RC Strasbourg Alsace",
      ground: "Stade de la Meinau",
      id: "cdfaf7f7-8d7c-4d35-8173-d67e238c8a71",
      location: "Strasbourg, France",
      logoSrc: "france/Racing_Club_de_Strasbourg.svg",
      primaryColor: "#00A1E4",
      secondaryColor: "#DD2B31",
      shortenedName: "STR",
      sourceId: "667",
    },
    "e3c68260-df86-4fc4-b5b2-40db66cee51d": {
      displayName: "Nîmes Olympique",
      ground: "Stade des Costières",
      id: "e3c68260-df86-4fc4-b5b2-40db66cee51d",
      location: "Nîmes, France",
      logoSrc: "france/Nimes_Olympique.svg",
      primaryColor: "#E5000A",
      secondaryColor: "#FFFFFF",
      shortenedName: "NIM",
      sourceId: "1160",
    },
    "f4aceb89-a8ac-4ff8-b13c-9f230ed85d56": {
      displayName: "Montpellier HSC",
      ground: "Stade de la Mosson",
      id: "f4aceb89-a8ac-4ff8-b13c-9f230ed85d56",
      location: "Montpellier, France",
      logoSrc: "france/Montpellier_HSC.svg",
      primaryColor: "#304376",
      secondaryColor: "#D97141",
      shortenedName: "MPL",
      sourceId: "969",
    },
    "fd5fa7bb-3211-41ce-b66f-49b074c2aab8": {
      displayName: "Stade Brestois 29",
      ground: "Stade Francis-Le Blé",
      id: "fd5fa7bb-3211-41ce-b66f-49b074c2aab8",
      location: "Brest, France",
      logoSrc: "france/Stade_Brestois_29.svg",
      primaryColor: "#EE151E",
      secondaryColor: "#FFFFFF",
      shortenedName: "B29",
      sourceId: "3911",
    },
    "fee996ac-2454-425a-97f9-09c35f28a65f": {
      displayName: "Angers SCO",
      ground: "Stade Raymond Kopa",
      id: "fee996ac-2454-425a-97f9-09c35f28a65f",
      location: "Angers, France",
      logoSrc: "france/Angers_SCO.svg",
      primaryColor: "#000000",
      secondaryColor: "#E8C557",
      shortenedName: "ANG",
      sourceId: "1420",
    },
  },
  germany: {
    "0f231945-0ffb-4dc6-9bae-604bf236ab2f": {
      displayName: "Fortuna Düsseldorf",
      ground: "Merkur Spiel-Arena",
      id: "0f231945-0ffb-4dc6-9bae-604bf236ab2f",
      location: "Düsseldorf, Germany",
      logoSrc: "germany/Fortuna_Düsseldorf.svg",
      primaryColor: "#DB2016",
      secondaryColor: "#FFFFFF",
      shortenedName: "DUS",
      sourceId: "38",
    },
    "158c2559-8f11-4e58-8439-0921d101c732": {
      displayName: "1. FC Union Berlin",
      ground: "Stadion An der Alten Försterei",
      id: "158c2559-8f11-4e58-8439-0921d101c732",
      location: "Berlin, Germany",
      logoSrc: "germany/FC_Union_Berlin.svg",
      primaryColor: "#D50016",
      secondaryColor: "#FCEB06",
      shortenedName: "UNB",
      sourceId: "89",
    },
    "166b21c1-7fcb-4eb0-b01c-ece3943a900b": {
      displayName: "FC Schalke 04",
      ground: "Veltins-Arena",
      id: "166b21c1-7fcb-4eb0-b01c-ece3943a900b",
      location: "Gelsenkirchen, Germany",
      logoSrc: "germany/FC_Schalke_04.svg",
      primaryColor: "#004C9E",
      secondaryColor: "#FFFFFF",
      shortenedName: "S04",
      sourceId: "33",
    },
    "1bbea28c-81cc-49e3-a894-a33c3714ffc5": {
      displayName: "SV Werder Bremen",
      ground: "Weser-Stadion",
      id: "1bbea28c-81cc-49e3-a894-a33c3714ffc5",
      location: "Bremen, Germany",
      logoSrc: "germany/SV_Werder_Bremen.svg",
      primaryColor: "#169152",
      secondaryColor: "#FFFFFF",
      shortenedName: "SVW",
      sourceId: "86",
    },
    "2e7b4ee7-8c0b-450b-8e10-a1bd5fc892c3": {
      displayName: "1. FC Köln",
      ground: "RheinEnergieStadion",
      id: "2e7b4ee7-8c0b-450b-8e10-a1bd5fc892c3",
      location: "Cologne, Germany",
      logoSrc: "germany/FC_Cologne.svg",
      primaryColor: "#FFFFFF",
      secondaryColor: "#EE151E",
      shortenedName: "CGN",
      sourceId: "3",
    },
    "3fa3a04b-fa87-49e9-8772-0820a516be9c": {
      displayName: "Borussia Dortmund",
      ground: "Signal Iduna Park",
      id: "3fa3a04b-fa87-49e9-8772-0820a516be9c",
      location: "Dortmund, Germany",
      logoSrc: "germany/Borussia_Dortmund.svg",
      primaryColor: "#FDE200",
      secondaryColor: "#000000",
      shortenedName: "DOR",
      sourceId: "16",
    },
    "49b443c0-c5f9-49fa-8e51-5a27547a9f67": {
      displayName: "TSG 1899 Hoffenheim",
      ground: "PreZero Arena",
      id: "49b443c0-c5f9-49fa-8e51-5a27547a9f67",
      location: "Hoffenheim, Germany",
      logoSrc: "germany/TSG_Hoffenheim.svg",
      primaryColor: "#1563B9",
      secondaryColor: "#FFFFFF",
      shortenedName: "TSG",
      sourceId: "533",
    },
    "4a8ab99d-7731-4467-9c16-8ba1663c545b": {
      displayName: "1. FSV Mainz 05",
      ground: "Opel Arena",
      id: "4a8ab99d-7731-4467-9c16-8ba1663c545b",
      location: "Mainz, Germany",
      logoSrc: "germany/Mainz_05.svg",
      primaryColor: "#C40C17",
      secondaryColor: "#FFFFFF",
      shortenedName: "MAI",
      sourceId: "39",
    },
    "4e3bfa69-db9e-4b06-ba57-bffd9c11b8d1": {
      displayName: "FC Augsburg",
      ground: "WWK Arena",
      id: "4e3bfa69-db9e-4b06-ba57-bffd9c11b8d1",
      location: "Augsburg, Germany",
      logoSrc: "germany/FC_Augsburg.svg",
      primaryColor: "#BB342F",
      secondaryColor: "#45724C",
      shortenedName: "AUG",
      sourceId: "167",
    },
    "6a0d669b-9a11-4001-a753-de12bb24bd0a": {
      displayName: "Borussia Mönchengladbach",
      ground: "Borussia-Park",
      id: "6a0d669b-9a11-4001-a753-de12bb24bd0a",
      location: "Mönchengladbach, Germany",
      logoSrc: "germany/Borussia_Mönchengladbach.svg",
      primaryColor: "#000000",
      secondaryColor: "#FFFFFF",
      shortenedName: "BMG",
      sourceId: "18",
    },
    "75e3d230-76a1-4339-9c0c-6155386bf897": {
      displayName: "RB Leipzig",
      ground: "Red Bull Arena",
      id: "75e3d230-76a1-4339-9c0c-6155386bf897",
      location: "Leipzig, Germany",
      logoSrc: "germany/RB_Leipzig.svg",
      primaryColor: "#DC013F",
      secondaryColor: "#071027",
      shortenedName: "RBL",
      sourceId: "23826",
    },
    "91f5c377-c4d9-49e9-9569-b5f6c44808e1": {
      displayName: "SC Freiburg",
      ground: "Schwarzwald-Stadion",
      id: "91f5c377-c4d9-49e9-9569-b5f6c44808e1",
      location: "Freiburg, Germany",
      logoSrc: "germany/SC_Freiburg.svg",
      primaryColor: "#000000",
      secondaryColor: "#CC3333",
      shortenedName: "SCF",
      sourceId: "60",
    },
    "93c01474-719c-4df3-a4ff-7c2561e04ac1": {
      displayName: "FC Bayern Munich",
      ground: "Allianz Arena",
      id: "93c01474-719c-4df3-a4ff-7c2561e04ac1",
      location: "Munich, Germany",
      logoSrc: "germany/FC_Bayern_München.svg",
      primaryColor: "#DC0029",
      secondaryColor: "#0066B3",
      shortenedName: "BAY",
      sourceId: "27",
    },
    "b14bb614-3a22-4e46-9c8f-6b0f7e091c6d": {
      displayName: "Bayer 04 Leverkusen",
      ground: "Bay Arena",
      id: "b14bb614-3a22-4e46-9c8f-6b0f7e091c6d",
      location: "Leverkusen, Germany",
      logoSrc: "germany/Bayer_04_Leverkusen.svg",
      primaryColor: "#E41C1B",
      secondaryColor: "#F4E600",
      shortenedName: "B04",
      sourceId: "15",
    },
    "c80d1327-c1f6-44ff-8d54-4ac93ff89763": {
      displayName: "Eintracht Frankfurt",
      ground: "Commerzbank-Arena",
      id: "c80d1327-c1f6-44ff-8d54-4ac93ff89763",
      location: "Frankfurt, Germany",
      logoSrc: "germany/Eintracht_Frankfurt.svg",
      primaryColor: "#E20006",
      secondaryColor: "#000000",
      shortenedName: "SGE",
      sourceId: "24",
    },
    "cbe09562-1bf1-4b92-8e6b-92ea740d2774": {
      displayName: "SC Paderborn 07",
      ground: "Benteler-Arena",
      id: "cbe09562-1bf1-4b92-8e6b-92ea740d2774",
      location: "Paderborn, Germany",
      logoSrc: "germany/SC_Paderborn_07.svg",
      primaryColor: "#005CA9",
      secondaryColor: "#000000",
      shortenedName: "SCP",
      sourceId: "127",
    },
    "dccf4aa9-74fb-4e7c-9011-20e7dd13ffbc": {
      displayName: "Hertha BSC",
      ground: "Olympiastadion",
      id: "dccf4aa9-74fb-4e7c-9011-20e7dd13ffbc",
      location: "Berlin, Germany",
      logoSrc: "germany/Hertha_BSC.svg",
      primaryColor: "#004C9F",
      secondaryColor: "#000000",
      shortenedName: "BCS",
      sourceId: "44",
    },
    "e18be703-c750-4731-a9e1-2079ad8837f2": {
      displayName: "VfL Wolfsburg",
      ground: "Volkswagen Arena",
      id: "e18be703-c750-4731-a9e1-2079ad8837f2",
      location: "Wolfsburg, Germany",
      logoSrc: "germany/VfL_Wolfsburg.svg",
      primaryColor: "#65B32D",
      secondaryColor: "#FFFFFF",
      shortenedName: "WOB",
      sourceId: "82",
    },
  },
  italy: {
    "174e65e5-6d72-4f53-b4be-9d139715c89a": {
      displayName: "Cagliari Calcio",
      ground: "Sardegna Arena",
      id: "174e65e5-6d72-4f53-b4be-9d139715c89a",
      location: "Cagliari, Italy",
      logoSrc: "italy/Cagliari.svg",
      primaryColor: "#082242",
      secondaryColor: "#B00F28",
      shortenedName: "CAG",
      sourceId: "1390",
    },
    "17dc6c9a-4f3b-4ebc-b3a4-bcb6eda1a30a": {
      displayName: "S.S. Lazio",
      ground: "Stadio Olimpico",
      id: "17dc6c9a-4f3b-4ebc-b3a4-bcb6eda1a30a",
      location: "Rome, Italy",
      logoSrc: "italy/SS_Lazio.svg",
      primaryColor: "#80D4F5",
      secondaryColor: "#DAA626",
      shortenedName: "LAZ",
      sourceId: "398",
    },
    "1869c021-2191-49cf-b671-ea9ea08cd0fb": {
      displayName: "A.C. Milan",
      ground: "San Siro",
      id: "1869c021-2191-49cf-b671-ea9ea08cd0fb",
      location: "Milan, Italy",
      logoSrc: "italy/AC_Milan.svg",
      primaryColor: "#FB0203",
      secondaryColor: "#000000",
      shortenedName: "MIL",
      sourceId: "5",
    },
    "2e52cbda-e75d-4420-9406-35b48f4393d7": {
      displayName: "Udinese Calcio",
      ground: "Dacia Arena",
      id: "2e52cbda-e75d-4420-9406-35b48f4393d7",
      location: "Udine, Italy",
      logoSrc: "italy/Udinese.png",
      primaryColor: "#000000",
      secondaryColor: "#FFFFFF",
      shortenedName: "UDN",
      sourceId: "410",
    },
    "3f45562f-f848-41e5-83ba-5f1a1e4e285f": {
      displayName: "Internazionale",
      ground: "San Siro",
      id: "3f45562f-f848-41e5-83ba-5f1a1e4e285f",
      location: "Milan, Italy",
      logoSrc: "italy/Inter_Milan.png",
      primaryColor: "#0966AC",
      secondaryColor: "#000000",
      shortenedName: "INT",
      sourceId: "46",
    },
    "4a7d7192-288d-4185-8d46-a337129c6e77": {
      displayName: "S.S.C. Napoli",
      ground: "Stadio San Paolo",
      id: "4a7d7192-288d-4185-8d46-a337129c6e77",
      location: "Naples, Italy",
      logoSrc: "italy/S.S.C._Napoli.svg",
      primaryColor: "#09A1D8",
      secondaryColor: "#003983",
      shortenedName: "NAP",
      sourceId: "6195",
    },
    "52aa8f01-478f-4efc-be06-5472237d7fc9": {
      displayName: "Brescia Calcio",
      ground: "Stadio Mario Rigamonti",
      id: "52aa8f01-478f-4efc-be06-5472237d7fc9",
      location: "Brescia, Italy",
      logoSrc: "italy/Brescia.svg",
      primaryColor: "#015DA9",
      secondaryColor: "#CDA834",
      shortenedName: "BRE",
      sourceId: "19",
    },
    "553160b8-3b85-400d-b295-4c3212c2014f": {
      displayName: "U.S. Lecce",
      ground: "Stadio Via del Mare",
      id: "553160b8-3b85-400d-b295-4c3212c2014f",
      location: "Lecce, Italy",
      logoSrc: "italy/US_Lecce.svg",
      primaryColor: "#005A82",
      secondaryColor: "#DBBE96",
      shortenedName: "LEC",
      sourceId: "1005",
    },
    "5afd6cb9-f14f-431a-a0c0-22e4d9424a8f": {
      displayName: "Genoa C.F.C.",
      ground: "Stadio Comunale Luigi Ferraris",
      id: "5afd6cb9-f14f-431a-a0c0-22e4d9424a8f",
      location: "Genoa, Italy",
      logoSrc: "italy/Genoa.png",
      primaryColor: "#001F49",
      secondaryColor: "#9F0028",
      shortenedName: "GEN",
      sourceId: "252",
    },
    "619fbd53-4382-441f-a664-31c2dc5507b2": {
      displayName: "Hellas Verona F.C.",
      ground: "Stadio Marc'Antonio Bentegodi",
      id: "619fbd53-4382-441f-a664-31c2dc5507b2",
      location: "Verona, Italy",
      logoSrc: "italy/Hellas_Verona_FC.svg",
      primaryColor: "#102484",
      secondaryColor: "#FFEE00",
      shortenedName: "VER",
      sourceId: "276",
    },
    "69007dc2-fb11-43ba-8b60-321960051e67": {
      displayName: "Torino F.C.",
      ground: "Stadio Olimpico Grande Torino",
      id: "69007dc2-fb11-43ba-8b60-321960051e67",
      location: "Turin, Italy",
      logoSrc: "italy/Torino_FC.svg",
      primaryColor: "#8A1811",
      secondaryColor: "#ECB30E",
      shortenedName: "TOR",
      sourceId: "416",
    },
    "6ab88ce9-af44-4299-9675-0b0598c8aba0": {
      displayName: "U.C. Sampdoria",
      ground: "Stadio Comunale Luigi Ferraris",
      id: "6ab88ce9-af44-4299-9675-0b0598c8aba0",
      location: "Genoa, Italy",
      logoSrc: "italy/U.C._Sampdoria.svg",
      primaryColor: "#007ABC",
      secondaryColor: "#DD3215",
      shortenedName: "SAM",
      sourceId: "1038",
    },
    "6d7b6c20-1bae-4439-8762-f52144812dc3": {
      displayName: "S.P.A.L.",
      ground: "Stadio Paolo Mazza",
      id: "6d7b6c20-1bae-4439-8762-f52144812dc3",
      location: "Ferrara, Italy",
      logoSrc: "italy/SPAL.svg",
      primaryColor: "#00A4DE",
      secondaryColor: "#CAAF77",
      shortenedName: "SPA",
      sourceId: "2722",
    },
    "83ab7af4-0410-4670-9398-844a1c251336": {
      displayName: "Atalanta B.C.",
      ground: "Gewiss Stadium",
      id: "83ab7af4-0410-4670-9398-844a1c251336",
      location: "Bergamo, Italy",
      logoSrc: "italy/Atalanta.svg",
      primaryColor: "#295CAF",
      secondaryColor: "#1D191A",
      shortenedName: "ATA",
      sourceId: "800",
    },
    "8b3c665f-6738-4744-81a7-91dbce1c58f7": {
      displayName: "Juventus F.C.",
      ground: "Allianz Stadium",
      id: "8b3c665f-6738-4744-81a7-91dbce1c58f7",
      location: "Turin, Italy",
      logoSrc: "italy/Juventus_FC.svg",
      primaryColor: "#000000",
      secondaryColor: "#FFFFFF",
      shortenedName: "JUV",
      sourceId: "506",
    },
    "9bc4bbfc-5b00-40b6-9ba4-e398114ec130": {
      displayName: "ACF Fiorentina",
      ground: "Stadio Artemio Franchi",
      id: "9bc4bbfc-5b00-40b6-9ba4-e398114ec130",
      location: "Florence, Italy",
      logoSrc: "italy/ACF_Fiorentina.svg",
      primaryColor: "#400293",
      secondaryColor: "#CF0000",
      shortenedName: "FIO",
      sourceId: "430",
    },
    "b59106f0-dd86-4e9d-8dc9-fd074aece6ee": {
      displayName: "U.S. Sassuolo Calcio",
      ground: "Mapei Stadium – Città del Tricolore",
      id: "b59106f0-dd86-4e9d-8dc9-fd074aece6ee",
      location: "Reggio Emilia, Italy",
      logoSrc: "italy/US_Sassuolo_Calcio.svg",
      primaryColor: "#32B65B",
      secondaryColor: "#231F20",
      shortenedName: "SAS",
      sourceId: "6574",
    },
    "d1c1940c-2fae-4aab-81cd-7355bc2c9d85": {
      displayName: "A.S. Roma",
      ground: "Stadio Olimpico",
      id: "d1c1940c-2fae-4aab-81cd-7355bc2c9d85",
      location: "Rome, Italy",
      logoSrc: "italy/AS_Roma.svg",
      primaryColor: "#990327",
      secondaryColor: "#FCBB00",
      shortenedName: "ROM",
      sourceId: "12",
    },
    "ed4244af-01d2-4c79-92b9-2f77149615cd": {
      displayName: "Bologna F.C. 1909",
      ground: "Stadio Renato Dall'Ara",
      id: "ed4244af-01d2-4c79-92b9-2f77149615cd",
      location: "Bologna, Italy",
      logoSrc: "italy/Bologna.png",
      primaryColor: "#A41520",
      secondaryColor: "#132A46",
      shortenedName: "BOL",
      sourceId: "1025",
    },
    "fd626290-dd26-4768-acae-1f3770304ff6": {
      displayName: "Parma Calcio 1913",
      ground: "Stadio Ennio Tardini",
      id: "fd626290-dd26-4768-acae-1f3770304ff6",
      location: "Parma, Italy",
      logoSrc: "italy/Parma.png",
      primaryColor: "#00338E",
      secondaryColor: "#FFD400",
      shortenedName: "PAR",
      sourceId: "130",
    },
  },
  spain: {
    "07cb5cdb-7b74-4191-82c4-4a3a8ab2fdcb": {
      displayName: "FC Barcelona",
      ground: "Camp Nou",
      id: "07cb5cdb-7b74-4191-82c4-4a3a8ab2fdcb",
      location: "Barcelona, Spain",
      logoSrc: "spain/FC_Barcelona.svg",
      primaryColor: "#A70042",
      secondaryColor: "#004C99",
      shortenedName: "FCB",
      sourceId: "131",
    },
    "0fa3d8dc-862d-4c3d-80fe-314055fe21f5": {
      displayName: "Getafe CF",
      ground: "Estadio Coliseum Alfonso Pérez",
      id: "0fa3d8dc-862d-4c3d-80fe-314055fe21f5",
      location: "Getafe, Spain",
      logoSrc: "spain/Getafe_CF.svg",
      primaryColor: "#2B53AE",
      secondaryColor: "#DD5130",
      shortenedName: "GET",
      sourceId: "3709",
    },
    "25c76dca-8b35-48f9-93fa-1057265b964e": {
      displayName: "CD Leganés",
      ground: "Estadio Municipal de Butarque",
      id: "25c76dca-8b35-48f9-93fa-1057265b964e",
      location: "Leganés, Spain",
      logoSrc: "spain/Leganes.svg",
      primaryColor: "#04196F",
      secondaryColor: "#FFFFFF",
      shortenedName: "LEG",
      sourceId: "1244",
    },
    "28ab7b13-84a6-4fa4-b645-e30ee5d005c9": {
      displayName: "Levante UD",
      ground: "Estadi Ciutat de València",
      id: "28ab7b13-84a6-4fa4-b645-e30ee5d005c9",
      location: "Valencia, Spain",
      logoSrc: "spain/Levante_UD.svg",
      primaryColor: "#005BA6",
      secondaryColor: "#B5003D",
      shortenedName: "LVT",
      sourceId: "3368",
    },
    "2a734618-cf1b-44cb-be80-b1ce3d8937d4": {
      displayName: "Valencia CF",
      ground: "Mestalla Stadium",
      id: "2a734618-cf1b-44cb-be80-b1ce3d8937d4",
      location: "Valencia, Spain",
      logoSrc: "spain/Valencia_CF.svg",
      primaryColor: "#EF311E",
      secondaryColor: "#FFE016",
      shortenedName: "VAL",
      sourceId: "1049",
    },
    "462eaa09-3935-4b21-83d9-7a684b0ca1c0": {
      displayName: "Deportivo Alavés",
      ground: "Mendizorrotza Stadium",
      id: "462eaa09-3935-4b21-83d9-7a684b0ca1c0",
      location: "Vitoria-Gasteiz, Spain",
      logoSrc: "spain/Deportivo_Alaves.svg",
      primaryColor: "#004FA3",
      secondaryColor: "#0490DA",
      shortenedName: "ALV",
      sourceId: "1108",
    },
    "5d7c2cfc-0ff1-42b6-a562-b4930cca3daf": {
      displayName: "Real Sociedad",
      ground: "Reale Arena",
      id: "5d7c2cfc-0ff1-42b6-a562-b4930cca3daf",
      location: "San Sebastián, Spain",
      logoSrc: "spain/Real_Sociedad.svg",
      primaryColor: "#143C8B",
      secondaryColor: "#FFFFFF",
      shortenedName: "SOC",
      sourceId: "681",
    },
    "6cbce2d3-4a91-4f0e-b799-b70ed1196566": {
      displayName: "Atlético Madrid",
      ground: "Wanda Metropolitano",
      id: "6cbce2d3-4a91-4f0e-b799-b70ed1196566",
      location: "Madrid, Spain",
      logoSrc: "spain/Atletico_Madrid.svg",
      primaryColor: "#CF311E",
      secondaryColor: "#202A60",
      shortenedName: "ATM",
      sourceId: "13",
    },
    "87023cb8-23d5-43db-8397-999c7f2f960d": {
      displayName: "RCD Mallorca",
      ground: "Son Moix Stadium",
      id: "87023cb8-23d5-43db-8397-999c7f2f960d",
      location: "Palma de Mallorca, Spain",
      logoSrc: "spain/RCD_Mallorca.svg",
      primaryColor: "#EE141E",
      secondaryColor: "#FFF700",
      shortenedName: "RCD",
      sourceId: "237",
    },
    "889c061a-cdd1-4d23-8df9-4595317d77cf": {
      displayName: "Granada CF",
      ground: "Estadio Nuevo Los Cármenes",
      id: "889c061a-cdd1-4d23-8df9-4595317d77cf",
      location: "Granada, Spain",
      logoSrc: "spain/Granada_CF.svg",
      primaryColor: "#E21E25",
      secondaryColor: "#375BA9",
      shortenedName: "GCF",
      sourceId: "16795",
    },
    "9ced15e0-9f7f-41c7-974d-eda6c88142d9": {
      displayName: "Athletic Bilbao",
      ground: "San Mamés Stadium",
      id: "9ced15e0-9f7f-41c7-974d-eda6c88142d9",
      location: "Bilbao, Spain",
      logoSrc: "spain/Club_Athletic_Bilbao.svg",
      primaryColor: "#EE2423",
      secondaryColor: "#000000",
      shortenedName: "ATB",
      sourceId: "621",
    },
    "abe2b8c8-26ca-48b8-9cc4-57e74b140bac": {
      displayName: "RC Celta de Vigo",
      ground: "Abanca-Balaídos",
      id: "abe2b8c8-26ca-48b8-9cc4-57e74b140bac",
      location: "Vigo, Spain",
      logoSrc: "spain/RC_Celta_de_Vigo.svg",
      primaryColor: "#8AC3EE",
      secondaryColor: "#E5244E",
      shortenedName: "CLV",
      sourceId: "940",
    },
    "ac5720ba-0460-4c66-9315-5c5dcc2c4527": {
      displayName: "Real Valladolid",
      ground: "Estadio José Zorrilla",
      id: "ac5720ba-0460-4c66-9315-5c5dcc2c4527",
      location: "Valladolid, Spain",
      logoSrc: "spain/Real_Valladolid.svg",
      primaryColor: "#921B89",
      secondaryColor: "#EB211B",
      shortenedName: "REV",
      sourceId: "366",
    },
    "b2050b89-0525-4eb3-8b98-e0239d12de1a": {
      displayName: "Real Betis",
      ground: "Estadio Benito Villamarín",
      id: "b2050b89-0525-4eb3-8b98-e0239d12de1a",
      location: "Seville, Spain",
      logoSrc: "spain/Real_Betis.svg",
      primaryColor: "#00954C",
      secondaryColor: "#FFFFFF",
      shortenedName: "BET",
      sourceId: "150",
    },
    "b205285c-f6c4-4265-86b9-d312e4cf9926": {
      displayName: "Sevilla FC",
      ground: "Ramón Sánchez Pizjuán Stadium",
      id: "b205285c-f6c4-4265-86b9-d312e4cf9926",
      location: "Seville, Spain",
      logoSrc: "spain/Sevilla_FC.png",
      primaryColor: "#D8061B",
      secondaryColor: "#FFFFFF",
      shortenedName: "SEV",
      sourceId: "368",
    },
    "b3517535-0384-48b4-a10c-020f6e792639": {
      displayName: "CA Osasuna",
      ground: "El Sadar Stadium",
      id: "b3517535-0384-48b4-a10c-020f6e792639",
      location: "Pamplona, Spain",
      logoSrc: "spain/Osasuna.svg",
      primaryColor: "#D91A20",
      secondaryColor: "#09336F",
      shortenedName: "OSA",
      sourceId: "331",
    },
    "bf8c467b-ab50-4e35-b5f1-27f010d78608": {
      displayName: "SD Eibar",
      ground: "Ipurua Futbol Zelaia",
      id: "bf8c467b-ab50-4e35-b5f1-27f010d78608",
      location: "Eibar, Spain",
      logoSrc: "spain/SD_Eibar.svg",
      primaryColor: "#CD152F",
      secondaryColor: "#CD152F",
      shortenedName: "EIB",
      sourceId: "1533",
    },
    "e2ddb049-085e-4455-b009-335c392e0787": {
      displayName: "RCD Espanyol",
      ground: "RCDE Stadium",
      id: "e2ddb049-085e-4455-b009-335c392e0787",
      location: "Barcelona, Spain",
      logoSrc: "spain/RCD_Espanyol.svg",
      primaryColor: "#1E6BC0",
      secondaryColor: "#FFFFFF",
      shortenedName: "ESY",
      sourceId: "714",
    },
    "ef2e000c-3dac-463a-8988-d783511f526f": {
      displayName: "Real Madrid CF",
      ground: "Santiago Bernabéu Stadium",
      id: "ef2e000c-3dac-463a-8988-d783511f526f",
      location: "Madrid, Spain",
      logoSrc: "spain/Real_Madrid_CF.svg",
      primaryColor: "#FFFFFF",
      secondaryColor: "#FEBF06",
      shortenedName: "MAD",
      sourceId: "418",
    },
    "f52b68d4-4097-44ec-9cbf-b254fdb5bec3": {
      displayName: "Villarreal CF",
      ground: "Estadio de la Cerámica",
      id: "f52b68d4-4097-44ec-9cbf-b254fdb5bec3",
      location: "Villarreal, Spain",
      logoSrc: "spain/Villarreal_CF.svg",
      primaryColor: "#FFE716",
      secondaryColor: "#013764",
      shortenedName: "VIL",
      sourceId: "1050",
    },
  },
};

export default teams;