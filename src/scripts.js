// Create a class for storing data.
class Tile {
	constructor(x, y, data, displayName, imagePath) {
		this.x = x;
		this.y = y;
		this.data = data;
		this.displayName = displayName;
		this.imagePath = imagePath;
	}
}

// Define the call to PokeApi.
const getPokemon = async (x, y, pokemon, displayName) => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
	if (response.status == 200) {
		const json = await response.json();
		stagePokemonTile(new Tile(x, y, json, displayName, null));
	} else stagePokemonTile(new Tile(x, y, undefined, displayName, null));
};

// Expand with caution.
const rawPuzzleData = [
	[
		"Blipbug",
		"Azumarill",
		"Dracozolt",
		"Noctowl",
		"Pineco",
		"Abra",
		"Doublade",
		"Mudsdale",
		"Diggersby",
		"Espurr",
		"Shroomish",
		"Vulpix"
	],
	[
		"Chimecho",
		"Vibrava",
		"Centiskorch",
		"Ferrothorn",
		"Machop",
		"Obstagoon",
		"Perrserker",
		"Alcremie",
		"Qwilfish",
		"Shedinja",
		"Heatran",
		"Torkoal"
	],
	[
		"Gardevoir",
		"Exeggutor",
		"Cresselia",
		"Decidueye",
		"Herdier",
		"Regirock",
		"Lairon",
		"Bibarel",
		"Gogoat",
		"Eevee",
		"Stantler",
		"Sentret"
	],
	[
		"Natu",
		"Hoppip",
		"Bulbasaur",
		"Porygon",
		"Joltik",
		"Wormadam-trash",
		"Rapidash-galar",
		"Morgrem",
		"Deerling",
		"Amoonguss",
		"Dialga",
		"Milotic"
	],
	[
		"Stunfisk-galar",
		"Volcarona",
		"Zweilous",
		"Octillery",
		"Cherrim",
		"Combusken",
		"Comfey",
		"Shuckle",
		"Blacephalon",
		"Muk-alola",
		"Simisear",
		"Haxorus"
	],
	[
		"Mienfoo",
		"Dracovish",
		"Decidueye",
		"Dwebble",
		"Roggenrola",
		"Oddish",
		"Tyrantrum",
		"Audino",
		"Quagsire",
		"Chingling",
		"Yanma",
		"Sylveon"
	],
	[
		"Volbeat",
		"Klinklang",
		"Pyroar",
		"Cubone",
		"Nosepass",
		"Graveler",
		"Staravia",
		"Shiftry",
		"Registeel",
		"Crawdaunt",
		"Mareep",
		"Wartortle"
	],
	[
		"Spearow",
		"Poochyena",
		"Timburr",
		"Mankey",
		"Glameow",
		"Zoroark",
		"Snorunt",
		"Donphan",
		"Pupitar",
		"Slurpuff",
		"Woobat",
		"Flaaffy"
	],
	[
		"Drilbur",
		"Farfetchd",
		"Marshadow",
		"Relicanth",
		"Floatzel",
		"Weedle",
		"Skarmory",
		"Armaldo",
		"Pidgeot",
		"Nihilego",
		"Raichu",
		"Mimikyu-disguised"
	],
	[
		"Escavalier",
		"Dugtrio",
		"Durant",
		"Golisopod",
		"Dodrio",
		"Silvally",
		"Misdreavus",
		"Stakataka",
		"Kubfu",
		"Teddiursa",
		"Thievul",
		"Whirlipede"
	],
	[
		"Trevenant",
		"Magearna",
		"Meltan",
		"Arcanine",
		"Weezing-galar",
		"Carbink",
		"Togedemaru",
		"Kabutops",
		"Pumpkaboo-average",
		"Sandygast",
		"Rhyperior",
		"Dragalge"
	],
	[
		"Yungoos",
		"Volcanion",
		"Hitmonchan",
		"Raboot",
		"Tauros",
		"Buneary",
		"Mamoswine",
		"Hariyama",
		"Staryu",
		"Tranquill",
		"Binacle",
		"Infernape"
	]
];

// Variables
let rawPuzzleEntryCount = 0;
let stagingData = undefined;
let puzzleData = undefined;

// Fetch detailed data for the raw puzzle data.
function fetchDetailedData() {
	console.clear();
	stagingData = [];
	puzzleData = [];
	for (let x = 0; x < rawPuzzleData.length; x++) {
		let row = [];
		for (let y = 0; y < rawPuzzleData[x].length; y++) {
			row.push(null);
			rawPuzzleEntryCount++;
			let displayName = rawPuzzleData[x][y];
			getPokemon(x, y, displayName.toLowerCase(), displayName);
		}

		puzzleData.push(row);
	}
}

// Process an individual pokemon tile.
let data = "";
function stagePokemonTile(tile) {
	stagingData.push(tile);
	if (stagingData.length == rawPuzzleData.flat().length) buildGrid();
}

// Build the display grid.
function buildGrid() {
	for (let i = 0; i < stagingData.length; i++) {
		let pokemon = stagingData[i];
		puzzleData[pokemon.x][pokemon.y] = pokemon;
	}

	let newGrid = "";
	for (let x = 0; x < puzzleData.length; x++) {
		for (let y = 0; y < puzzleData[x].length; y++) {
			let pokemon = puzzleData[x][y];
			let tile = "<div";
			tile += ' id="tile-' + pokemon.x + "-" + pokemon.y + '"';
			tile += ' onclick="chooseTile(' + pokemon.x + ", " + pokemon.y + ')"';
			tile += ' data-bs-toggle="modal" href="#dataModal"';
			tile += ">";
			
			let imageSource = 'https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/' + pokemon.displayName.toLowerCase() + '.png';
			if (pokemon.data != undefined) {
				tile += '<div class="initial">' + pokemon.data.name.charAt(0) + '</div>';
				tile += '<div class="id">' + pokemon.data.id + '</div>';
				for (let i = 0; i < pokemon.data.types.length; i++) {
					tile += '<div class="type-' + (i + 1) + ' ' + pokemon.data.types[i].type.name + '"></div>';
				}
				
				if (pokemon.data.sprites.front_default != null)
					imageSource = pokemon.data.sprites.front_default;
			}
			

			tile += '<div class="tip" data-bs-toggle="tooltip" data-bs-placement="bottom" title="' + pokemon.displayName + '">';
			tile += '<img src="' + imageSource + '" />';
			tile += '</div>';
			tile += "</div>";
			newGrid += tile;
		}
	}
	
	document.getElementById("grid").innerHTML = newGrid;
	var tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
}

// Set the display data for the modal.
function chooseTile(x, y) {
	let pokemon = puzzleData[x][y];
	document.getElementById('modal-title').innerText = pokemon.displayName;
}

// Trigger the entire process.
fetchDetailedData();
