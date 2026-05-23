const matches = [
    {
        team1: 'España',
        team2: 'Brasil',
        phase: 'Fase de grupos',
        stadium: 'MetLife Stadium',
        time: '20:00'
    },

    {
        team1: 'Argentina',
        team2: 'Francia',
        phase: 'Octavos',
        stadium: 'SoFi Stadium',
        time: '22:00'
    },

    {
        team1: 'Portugal',
        team2: 'Alemania',
        phase: 'Cuartos',
        stadium: 'Azteca',
        time: '19:00'
    }
];

const groups = {
    'Grupo A': [
        'España',
        'Brasil',
        'México',
        'Japón'
    ],

    'Grupo B': [
        'Argentina',
        'Francia',
        'Portugal',
        'Croacia'
    ],

    'Grupo C': [
        'Alemania',
        'Italia',
        'USA',
        'Canadá'
    ]
};

const teams = [
    'España',
    'Argentina',
    'Brasil',
    'Francia',
    'Portugal',
    'Alemania',
    'Italia',
    'México',
    'USA',
    'Canadá'
];

const matchesContainer =
    document.getElementById('matches-container');

matches.forEach(match => {

    matchesContainer.innerHTML += `
  
    <div class="match-card">

      <small>${match.phase}</small>

      <div class="team-row">
        <span>${match.team1}</span>
        <strong>VS</strong>
      </div>

      <div class="team-row">
        <span>${match.team2}</span>
        <span>${match.time}</span>
      </div>

      <p>${match.stadium}</p>

    </div>
  
  `;

});

const groupsContainer =
    document.getElementById('groups-container');

Object.entries(groups).forEach(([groupName, teams]) => {

    let html = `
  
    <div class="group-card">

      <div class="group-header">
        <h4>${groupName}</h4>
      </div>

      <div class="group-body">
  
  `;

    teams.forEach((team, index) => {

        html += `
    
      <div class="group-team">

        <span>
          ${index + 1}. ${team}
        </span>

        <strong>
          ${6 - index} pts
        </strong>

      </div>
    
    `;

    });

    html += `
      </div>
    </div>
  `;

    groupsContainer.innerHTML += html;

});

const teamsContainer =
    document.getElementById('teams-container');

teams.forEach(team => {

    teamsContainer.innerHTML += `
  
    <div class="team-card">

      <h4>⚽</h4>

      <p>${team}</p>

    </div>
  
  `;

});