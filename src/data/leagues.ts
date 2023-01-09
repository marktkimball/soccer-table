import { QualificationTypes } from "../interfaces/qualification-types";

interface LeagueData {
  [country: string]: {
    [year: string]: {
      qualificationTypes: QualificationTypes;
      teamIds: {
        [teamId: string]: boolean;
      };
    };
  };
}

const leagues: LeagueData = {
  england: {
    2019: {
      qualificationTypes: {
        championsLeagueGroup: [1, 2, 3, 4],
        europaLeagueGroup: [5],
        relegation: [18, 19, 20],
      },
      teamIds: {
        "053980d1-9205-4f90-b581-a403851c32e0": true,
        "14a47cb1-f497-4d71-879b-b7e82c85e804": true,
        "18de8ce2-736d-4c83-b4db-c473f1a03101": true,
        "1d97c20b-b36c-4307-b227-f11de588c955": true,
        "3d8b2af7-a43f-43a1-9fcb-0b9c7c9b8fad": true,
        "4303d6fc-7c8d-4f19-aab7-37e4c64195cf": true,
        "432b8777-b474-4ff9-bdd0-7dc41bd24e80": true,
        "479aa6bf-67ec-4320-a1dc-2d5b77c2f1a4": true,
        "4e34107f-ccd8-4c94-a04f-5eb8d8637533": true,
        "4f30eb3c-4f9d-4506-a62f-e6021429e6de": true,
        "5696bf7b-3256-4937-9d6d-952da49ddee9": true,
        "79ee152d-e7ee-4511-8d8f-f1632d7570ec": true,
        "8368521e-502a-4302-86d3-cf728550d1bd": true,
        "8ecf419b-9fde-46e5-960b-9c5f7f14dc3d": true,
        "906ce93b-8e71-409c-b459-4259fd3d35ad": true,
        "91c704f0-77ac-4898-a8bd-9539c66ef301": true,
        "9ad2bac0-8e7e-44cf-924e-75add32d8e5d": true,
        "e96fbd1c-bbd5-4d69-a7c7-2e45f5b579cb": true,
        "f29e61a2-23f0-462b-b9c7-420b09fec5d9": true,
        "f9c15363-34ad-4156-a273-12ec0f212df6": true,
      },
    },
  },
  france: {
    2019: {
      qualificationTypes: {
        championsLeagueGroup: [1, 2],
        championsLeagueQualifiers: [3],
        europaLeagueGroup: [4],
        relegation: [19, 20],
        relegationPlayoff: [18],
      },
      teamIds: {
        "21274b2b-3500-4a49-971b-0a6ae9cafb58": true,
        "2507719b-e3f6-4763-a012-b3c302b2b4b8": true,
        "2b3249eb-5868-4700-8d55-cb5985e34339": true,
        "2dc5c094-9b90-4f1b-911a-3f68294dad99": true,
        "3ba8e3a3-ba20-4ec8-b01a-a5945a56a93b": true,
        "3e6520d5-8a18-4bd6-8ad4-5e00f7add2e0": true,
        "4b2a1635-9a3d-42ca-afb1-f46766b7b179": true,
        "5e7d0f28-97c0-46f4-b733-2073f02065ef": true,
        "64b2a17a-aa75-4171-b2b6-dfabd6083d48": true,
        "7e6c61aa-3e8c-4a3e-8520-523e8608070c": true,
        "883b4940-1fb9-4714-9fd1-418c8ea7ed65": true,
        "a0497862-8645-4890-a4f1-10d83941ecb8": true,
        "a0a38e6c-30e3-4ec9-9dd9-02b524217df2": true,
        "a7edfa0f-eb3d-4484-8437-3886cee7a3c5": true,
        "ae1b5cf9-73b2-41ef-bc92-4715dd6a4af0": true,
        "cdfaf7f7-8d7c-4d35-8173-d67e238c8a71": true,
        "e3c68260-df86-4fc4-b5b2-40db66cee51d": true,
        "f4aceb89-a8ac-4ff8-b13c-9f230ed85d56": true,
        "fd5fa7bb-3211-41ce-b66f-49b074c2aab8": true,
        "fee996ac-2454-425a-97f9-09c35f28a65f": true,
      },
    },
  },
  germany: {
    2019: {
      qualificationTypes: {
        championsLeagueGroup: [1, 2, 3, 4],
        europaLeagueGroup: [5],
        europaLeagueQualifiers: [6],
        relegation: [17, 18],
        relegationPlayoff: [16],
      },
      teamIds: {
        "0f231945-0ffb-4dc6-9bae-604bf236ab2f": true,
        "158c2559-8f11-4e58-8439-0921d101c732": true,
        "166b21c1-7fcb-4eb0-b01c-ece3943a900b": true,
        "1bbea28c-81cc-49e3-a894-a33c3714ffc5": true,
        "2e7b4ee7-8c0b-450b-8e10-a1bd5fc892c3": true,
        "3fa3a04b-fa87-49e9-8772-0820a516be9c": true,
        "49b443c0-c5f9-49fa-8e51-5a27547a9f67": true,
        "4a8ab99d-7731-4467-9c16-8ba1663c545b": true,
        "4e3bfa69-db9e-4b06-ba57-bffd9c11b8d1": true,
        "6a0d669b-9a11-4001-a753-de12bb24bd0a": true,
        "75e3d230-76a1-4339-9c0c-6155386bf897": true,
        "91f5c377-c4d9-49e9-9569-b5f6c44808e1": true,
        "93c01474-719c-4df3-a4ff-7c2561e04ac1": true,
        "b14bb614-3a22-4e46-9c8f-6b0f7e091c6d": true,
        "c80d1327-c1f6-44ff-8d54-4ac93ff89763": true,
        "cbe09562-1bf1-4b92-8e6b-92ea740d2774": true,
        "dccf4aa9-74fb-4e7c-9011-20e7dd13ffbc": true,
        "e18be703-c750-4731-a9e1-2079ad8837f2": true,
      },
    },
  },
  italy: {
    2019: {
      qualificationTypes: {
        championsLeagueGroup: [1, 2, 3, 4],
        europaLeagueGroup: [5],
        europaLeagueQualifiers: [6],
        relegation: [18, 19, 20],
      },
      teamIds: {
        "174e65e5-6d72-4f53-b4be-9d139715c89a": true,
        "17dc6c9a-4f3b-4ebc-b3a4-bcb6eda1a30a": true,
        "1869c021-2191-49cf-b671-ea9ea08cd0fb": true,
        "2e52cbda-e75d-4420-9406-35b48f4393d7": true,
        "3f45562f-f848-41e5-83ba-5f1a1e4e285f": true,
        "4a7d7192-288d-4185-8d46-a337129c6e77": true,
        "52aa8f01-478f-4efc-be06-5472237d7fc9": true,
        "553160b8-3b85-400d-b295-4c3212c2014f": true,
        "5afd6cb9-f14f-431a-a0c0-22e4d9424a8f": true,
        "619fbd53-4382-441f-a664-31c2dc5507b2": true,
        "69007dc2-fb11-43ba-8b60-321960051e67": true,
        "6ab88ce9-af44-4299-9675-0b0598c8aba0": true,
        "6d7b6c20-1bae-4439-8762-f52144812dc3": true,
        "83ab7af4-0410-4670-9398-844a1c251336": true,
        "8b3c665f-6738-4744-81a7-91dbce1c58f7": true,
        "9bc4bbfc-5b00-40b6-9ba4-e398114ec130": true,
        "b59106f0-dd86-4e9d-8dc9-fd074aece6ee": true,
        "d1c1940c-2fae-4aab-81cd-7355bc2c9d85": true,
        "ed4244af-01d2-4c79-92b9-2f77149615cd": true,
        "fd626290-dd26-4768-acae-1f3770304ff6": true,
      },
    },
  },
  spain: {
    2019: {
      qualificationTypes: {
        championsLeagueGroup: [1, 2, 3, 4],
        europaLeagueGroup: [5],
        europaLeagueQualifiers: [6],
        relegation: [18, 19, 20],
      },
      teamIds: {
        "07cb5cdb-7b74-4191-82c4-4a3a8ab2fdcb": true,
        "0fa3d8dc-862d-4c3d-80fe-314055fe21f5": true,
        "25c76dca-8b35-48f9-93fa-1057265b964e": true,
        "28ab7b13-84a6-4fa4-b645-e30ee5d005c9": true,
        "2a734618-cf1b-44cb-be80-b1ce3d8937d4": true,
        "462eaa09-3935-4b21-83d9-7a684b0ca1c0": true,
        "5d7c2cfc-0ff1-42b6-a562-b4930cca3daf": true,
        "6cbce2d3-4a91-4f0e-b799-b70ed1196566": true,
        "87023cb8-23d5-43db-8397-999c7f2f960d": true,
        "889c061a-cdd1-4d23-8df9-4595317d77cf": true,
        "9ced15e0-9f7f-41c7-974d-eda6c88142d9": true,
        "abe2b8c8-26ca-48b8-9cc4-57e74b140bac": true,
        "ac5720ba-0460-4c66-9315-5c5dcc2c4527": true,
        "b2050b89-0525-4eb3-8b98-e0239d12de1a": true,
        "b205285c-f6c4-4265-86b9-d312e4cf9926": true,
        "b3517535-0384-48b4-a10c-020f6e792639": true,
        "bf8c467b-ab50-4e35-b5f1-27f010d78608": true,
        "e2ddb049-085e-4455-b009-335c392e0787": true,
        "ef2e000c-3dac-463a-8988-d783511f526f": true,
        "f52b68d4-4097-44ec-9cbf-b254fdb5bec3": true,
      },
    },
  },
};

export default leagues;
