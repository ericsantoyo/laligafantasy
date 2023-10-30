export default (props) => {
  const cellValue = props.value;

  // let number = (cellValue).toLocaleString('en-US', {
  //   valute: 'USD',

  // });
  const formatter = new Intl.NumberFormat("en-GB", {});

  if (props.value > 1) {
    return (
      <div className="flex justify-center items-center h-full mr-3 sm:mr-0">
        {formatter.format(cellValue)}
      </div>
    );
  }

  if (props.value < 1) {
    return (
      <div className="flex justify-center items-center h-full">
        {formatter.format(cellValue)}
      </div>
    );
  }
};

[
  {
    playerData: {
      playerID: 1678,
      name: "Jude Bellingham",
      nickname: "Bellingham",
      position: "Centrocampista",
      status: "ok",
      positionID: 3,
      averagePoints: 11.2222222222222,
      marketValue: 99711920,
      teamID: 15,
      image: "/playerImages/1678.png",
      points: 101,
      marketValues: [
        {
          lfpId: 15001678,
          marketValue: 95136050,
          date: "2023-10-10T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 15001678,
          marketValue: 96210830,
          date: "2023-10-11T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 15001678,
          marketValue: 97190245,
          date: "2023-10-12T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 15001678,
          marketValue: 98181758,
          date: "2023-10-13T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 15001678,
          marketValue: 98921012,
          date: "2023-10-14T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 15001678,
          marketValue: 99711920,
          date: "2023-10-15T00:00:00+02:00",
          bids: 0,
        },
      ],
      lastMarketChange: 790908,
      previousMarketValue: 98921012,
      teamName: "Real Madrid",
    },
    stats: [
      {
        playerID: 1678,
        ball_recovery: [3, 0],
        effective_clearance: [1, 0],
        goal_assist: [0, 0],
        goals: [1, 5],
        goals_conceded: [1, 0],
        isInIdealFormation: false,
        marca_points: [-1, 3],
        mins_played: [90, 2],
        offtarget_att_assist: [0, 0],
        own_goals: [0, 0],
        pen_area_entries: [1, 0],
        penalty_conceded: [0, 0],
        penalty_failed: [0, 0],
        penalty_save: [0, 0],
        penalty_won: [0, 0],
        poss_lost_all: [16, -1],
        red_card: [0, 0],
        saves: [0, 0],
        second_yellow_card: [0, 0],
        totalPoints: 9,
        total_scoring_att: [1, 0],
        week: 4,
        won_contest: [1, 0],
        yellow_card: [0, 0],
      },
      {
        playerID: 1678,
        ball_recovery: [3, 0],
        effective_clearance: [1, 0],
        goal_assist: [0, 0],
        goals: [1, 5],
        goals_conceded: [0, 2],
        isInIdealFormation: true,
        marca_points: [-1, 3],
        mins_played: [90, 2],
        offtarget_att_assist: [0, 0],
        own_goals: [0, 0],
        pen_area_entries: [0, 0],
        penalty_conceded: [0, 0],
        penalty_failed: [0, 0],
        penalty_save: [0, 0],
        penalty_won: [0, 0],
        poss_lost_all: [9, 0],
        red_card: [0, 0],
        saves: [0, 0],
        second_yellow_card: [0, 0],
        totalPoints: 12,
        total_scoring_att: [1, 0],
        week: 3,
        won_contest: [1, 0],
        yellow_card: [0, 0],
      },
    ],
  },

  {
    playerData: {
      playerID: 1197,
      name: "Takefusa Kubo",
      nickname: "Kubo",
      position: "Centrocampista",
      status: "ok",
      positionID: 3,
      averagePoints: 8.55555555555556,
      marketValue: 75061508,
      teamID: 16,
      image: "/playerImages/1197.png",
      points: 77,
      marketValues: [
        {
          lfpId: 16001197,
          marketValue: 74551152,
          date: "2023-10-11T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 16001197,
          marketValue: 74744290,
          date: "2023-10-12T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 16001197,
          marketValue: 74854662,
          date: "2023-10-13T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 16001197,
          marketValue: 74949162,
          date: "2023-10-14T00:00:00+02:00",
          bids: 0,
        },
        {
          lfpId: 16001197,
          marketValue: 75061508,
          date: "2023-10-15T00:00:00+02:00",
          bids: 0,
        },
      ],
      lastMarketChange: 112346,
      previousMarketValue: 74949162,
      teamName: "Real Sociedad",
    },
    stats: [
      {
        playerID: 1197,
        ball_recovery: [3, 0],
        effective_clearance: [0, 0],
        goal_assist: [0, 0],
        goals: [2, 10],
        goals_conceded: [1, 0],
        isInIdealFormation: true,
        marca_points: [-1, 2],
        mins_played: [79, 2],
        offtarget_att_assist: [0, 0],
        own_goals: [0, 0],
        pen_area_entries: [0, 0],
        penalty_conceded: [0, 0],
        penalty_failed: [0, 0],
        penalty_save: [0, 0],
        penalty_won: [0, 0],
        poss_lost_all: [12, -1],
        red_card: [0, 0],
        saves: [0, 0],
        second_yellow_card: [0, 0],
        totalPoints: 14,
        total_scoring_att: [2, 1],
        week: 4,
        won_contest: [0, 0],
        yellow_card: [0, 0],
      },
      {
        playerID: 1197,
        ball_recovery: [8, 1],
        effective_clearance: [0, 0],
        goal_assist: [0, 0],
        goals: [0, 0],
        goals_conceded: [0, 2],
        isInIdealFormation: false,
        marca_points: [-1, 2],
        mins_played: [75, 2],
        offtarget_att_assist: [1, 1],
        own_goals: [0, 0],
        pen_area_entries: [2, 1],
        penalty_conceded: [0, 0],
        penalty_failed: [0, 0],
        penalty_save: [0, 0],
        penalty_won: [0, 0],
        poss_lost_all: [10, -1],
        red_card: [0, 0],
        saves: [0, 0],
        second_yellow_card: [0, 0],
        totalPoints: 9,
        total_scoring_att: [0, 0],
        week: 3,
        won_contest: [2, 1],
        yellow_card: [0, 0],
      },
    ],
  },
];
