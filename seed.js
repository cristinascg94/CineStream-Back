const mongoose = require('mongoose');
const User = require('./models/user.model');
const Film = require('./models/film.model');
const Booking = require('./models/booking.model');
const Serie = require('./models/serie.model')
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

  const users = [
    { _id: new mongoose.Types.ObjectId(), name: "Alice Johnson", email: "alice@example.com", password: "password123", role: "user" },
    { _id: new mongoose.Types.ObjectId(), name: "Admin", email: "admin@example.com", password: "password123", role: "admin" },
    { _id: new mongoose.Types.ObjectId(), name: "Charlie Brown", email: "charlie@example.com", password: "password123", role: "user" },
    { _id: new mongoose.Types.ObjectId(), name: "Dana Scully", email: "dana@example.com", password: "password123", role: "admin" }
];

const films = [
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
        year: 1994,
        thema: "Drama",
        synopsis: "Dos hombres encarcelados entablan una amistad a lo largo de varios años, encontrando consuelo y redención final a través de actos de decencia común.",
        image: "http://example.com/images/shawshank.jpg",
        valoration: 9.3,
        ageRestriction: "16+",
        trailer: "http://example.com/trailers/shawshank.mp4",
        pricePerDay: 2.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "The Godfather",
        director: "Francis Ford Coppola",
        actors: "Marlon Brando, Al Pacino, James Caan",
        year: 1972,
        thema: "Crimen, Drama",
        synopsis: "El envejecido patriarca de una dinastía criminal organiza la transferencia de su imperio clandestino a su hijo reacio.",
        image: "http://example.com/images/godfather.jpg",
        valoration: 9.2,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/godfather.mp4",
        pricePerDay: 3.49,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "The Dark Knight",
        director: "Christopher Nolan",
        actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
        year: 2008,
        thema: "Acción, Crimen, Drama",
        synopsis: "Cuando la amenaza conocida como el Joker emerge de su pasado misterioso, causa estragos y caos en la gente de Gotham.",
        image: "http://example.com/images/darkknight.jpg",
        valoration: 9.0,
        ageRestriction: "13+",
        trailer: "http://example.com/trailers/darkknight.mp4",
        pricePerDay: 3.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Pulp Fiction",
        director: "Quentin Tarantino",
        actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
        year: 1994,
        thema: "Crimen, Drama",
        synopsis: "La vida de dos sicarios, un boxeador, la esposa de un gánster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.",
        image: "http://example.com/images/pulpfiction.jpg",
        valoration: 8.9,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/pulpfiction.mp4",
        pricePerDay: 2.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Forrest Gump",
        director: "Robert Zemeckis",
        actors: "Tom Hanks, Robin Wright, Gary Sinise",
        year: 1994,
        thema: "Drama, Romance",
        synopsis: "La presidencia de Kennedy y Johnson, los eventos de Vietnam, Watergate y otros eventos históricos se desarrollan desde la perspectiva de un hombre de Alabama con un CI bajo.",
        image: "http://example.com/images/forrestgump.jpg",
        valoration: 8.8,
        ageRestriction: "13+",
        trailer: "http://example.com/trailers/forrestgump.mp4",
        pricePerDay: 2.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Inception",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        year: 2010,
        thema: "Acción, Aventura, Ciencia Ficción",
        synopsis: "Un ladrón que roba secretos corporativos a través del uso de tecnología de sueños compartidos es dado la tarea inversa de plantar una idea en la mente de un CEO.",
        image: "http://example.com/images/inception.jpg",
        valoration: 8.8,
        ageRestriction: "13+",
        trailer: "http://example.com/trailers/inception.mp4",
        pricePerDay: 3.49,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Fight Club",
        director: "David Fincher",
        actors: "Brad Pitt, Edward Norton, Meat Loaf",
        year: 1999,
        thema: "Drama",
        synopsis: "Un oficinista insomne y un fabricante de jabón imprudente forman un club de pelea subterráneo que se convierte en algo mucho, mucho más.",
        image: "http://example.com/images/fightclub.jpg",
        valoration: 8.8,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/fightclub.mp4",
        pricePerDay: 2.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        year: 1999,
        thema: "Acción, Ciencia Ficción",
        synopsis: "Un hacker descubre la verdad inquietante sobre su realidad y su papel en la guerra contra sus controladores.",
        image: "http://example.com/images/matrix.jpg",
        valoration: 8.7,
        ageRestriction: "16+",
        trailer: "http://example.com/trailers/matrix.mp4",
        pricePerDay: 3.49,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Interstellar",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        year: 2014,
        thema: "Aventura, Drama, Ciencia Ficción",
        synopsis: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.",
        image: "http://example.com/images/interstellar.jpg",
        valoration: 8.6,
        ageRestriction: "13+",
        trailer: "http://example.com/trailers/interstellar.mp4",
        pricePerDay: 3.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Parasite",
        director: "Bong Joon Ho",
        actors: "Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo",
        year: 2019,
        thema: "Comedia, Drama, Suspense",
        synopsis: "Toda la familia Kim se interesa por los ricos y glamorosos Parks hasta que se ven atrapados en un incidente inesperado.",
        image: "http://example.com/images/parasite.jpg",
        valoration: 8.6,
        ageRestriction: "16+",
        trailer: "http://example.com/trailers/parasite.mp4",
        pricePerDay: 3.49,
        available: true 
    }
];

const series = [
    { _id: new mongoose.Types.ObjectId(), title: "Breaking Bad",
        director: "Vince Gilligan",
        actors: "Bryan Cranston, Aaron Paul, Anna Gunn",
        year: 2008,
        thema: "Crimen, Drama, Suspense",
        synopsis: "Un profesor de química convertido en fabricante de metanfetaminas se asocia con un exalumno para asegurar el futuro financiero de su familia.",
        image: "http://example.com/images/breakingbad.jpg",
        valoration: 9.5,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/breakingbad.mp4",
        pricePerDay: 2.99,
        available: true },
    { _id: new mongoose.Types.ObjectId(), title: "Stranger Things",
        director: "Los Hermanos Duffer",
        actors: "Winona Ryder, David Harbour, Finn Wolfhard",
        year: 2016,
        thema: "Drama, Fantasía, Terror",
        synopsis: "Cuando un niño desaparece, una pequeña ciudad descubre un misterio que involucra experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
        image: "http://example.com/images/strangerthings.jpg",
        valoration: 8.8,
        ageRestriction: "16+",
        trailer: "http://example.com/trailers/strangerthings.mp4",
        pricePerDay: 2.49,
        available: true },
    { _id: new mongoose.Types.ObjectId(), title: "Game of Thrones",
        director: "David Benioff, D.B. Weiss",
        actors: "Emilia Clarke, Peter Dinklage, Kit Harington",
        year: 2011,
        thema: "Acción, Aventura, Drama",
        synopsis: "Nueve familias nobles luchan por el control de las tierras de Westeros, mientras un antiguo enemigo vuelve después de estar inactivo durante miles de años.",
        image: "http://example.com/images/gameofthrones.jpg",
        valoration: 9.3,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/gameofthrones.mp4",
        pricePerDay: 3.99,
        available: true },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "The Witcher",
        director: "Lauren Schmidt Hissrich",
        actors: "Henry Cavill, Anya Chalotra, Freya Allan",
        year: 2019,
        thema: "Acción, Aventura, Drama",
        synopsis: "Geralt de Rivia, un cazador de monstruos solitario, lucha por encontrar su lugar en un mundo donde las personas suelen ser más perversas que las bestias.",
        image: "http://example.com/images/thewitcher.jpg",
        valoration: 8.2,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/thewitcher.mp4",
        pricePerDay: 3.49,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "The Mandalorian",
        director: "Jon Favreau",
        actors: "Pedro Pascal, Gina Carano, Carl Weathers",
        year: 2019,
        thema: "Acción, Aventura, Fantasía",
        synopsis: "Un cazarrecompensas mandaloriano viaja a los confines de la galaxia, lejos de la autoridad de la Nueva República.",
        image: "http://example.com/images/themandalorian.jpg",
        valoration: 8.7,
        ageRestriction: "13+",
        trailer: "http://example.com/trailers/themandalorian.mp4",
        pricePerDay: 3.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Chernobyl",
        director: "Johan Renck",
        actors: "Jared Harris, Stellan Skarsgård, Emily Watson",
        year: 2019,
        thema: "Drama, Historia, Suspense",
        synopsis: "Una dramatización de la catástrofe nuclear de Chernóbil y los esfuerzos sin precedentes para contener el desastre.",
        image: "http://example.com/images/chernobyl.jpg",
        valoration: 9.4,
        ageRestriction: "16+",
        trailer: "http://example.com/trailers/chernobyl.mp4",
        pricePerDay: 2.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Dark",
        director: "Baran bo Odar, Jantje Friese",
        actors: "Louis Hofmann, Karoline Eichhorn, Lisa Vicari",
        year: 2017,
        thema: "Crimen, Drama, Misterio",
        synopsis: "Una desaparición de niños desentraña los secretos de cuatro familias y una red de tiempo y espacio que abarca varias generaciones.",
        image: "http://example.com/images/dark.jpg",
        valoration: 8.8,
        ageRestriction: "16+",
        trailer: "http://example.com/trailers/dark.mp4",
        pricePerDay: 2.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "The Crown",
        director: "Peter Morgan",
        actors: "Claire Foy, Olivia Colman, Imelda Staunton",
        year: 2016,
        thema: "Biografía, Drama, Historia",
        synopsis: "Sigue la vida de la Reina Isabel II y los eventos políticos y personales que han moldeado su reinado.",
        image: "http://example.com/images/thecrown.jpg",
        valoration: 8.6,
        ageRestriction: "13+",
        trailer: "http://example.com/trailers/thecrown.mp4",
        pricePerDay: 2.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Westworld",
        director: "Jonathan Nolan, Lisa Joy",
        actors: "Evan Rachel Wood, Thandiwe Newton, Jeffrey Wright",
        year: 2016,
        thema: "Drama, Misterio, Ciencia Ficción",
        synopsis: "En un parque temático futurista, los visitantes interactúan con androides en escenarios del Viejo Oeste, pero las cosas empiezan a ir mal.",
        image: "http://example.com/images/westworld.jpg",
        valoration: 8.6,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/westworld.mp4",
        pricePerDay: 3.99,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Black Mirror",
        director: "Charlie Brooker",
        actors: "Bryce Dallas Howard, Alice Eve, Michael Kelly",
        year: 2011,
        thema: "Drama, Ciencia Ficción, Suspense",
        synopsis: "Una serie de antología que explora un futuro retorcido y de alta tecnología donde las mayores innovaciones de la humanidad y sus oscuros instintos chocan.",
        image: "http://example.com/images/blackmirror.jpg",
        valoration: 8.8,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/blackmirror.mp4",
        pricePerDay: 3.49,
        available: true 
    },
    { 
        _id: new mongoose.Types.ObjectId(), 
        title: "Fleabag",
        director: "Phoebe Waller-Bridge",
        actors: "Phoebe Waller-Bridge, Sian Clifford, Olivia Colman",
        year: 2016,
        thema: "Comedia, Drama",
        synopsis: "Una mujer joven navega por la vida en Londres mientras trata de sobrellevar la tragedia y la lucha interna.",
        image: "http://example.com/images/fleabag.jpg",
        valoration: 8.7,
        ageRestriction: "18+",
        trailer: "http://example.com/trailers/fleabag.mp4",
        pricePerDay: 2.49,
        available: true 
    }
];

const bookings = [
    {
        user: users[0]._id,
        type: "Film",
        film: films[0]._id,
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-07-07'),
        price: films[0].pricePerDay * 6
    },
    {
        user: users[1]._id,
        type: "Serie",
        serie: series[0].id,
        startDate: new Date('2024-07-03'),
        endDate: new Date('2024-07-10'),
        price: series[0].pricePerDay * 7
    },

    { user: users[2]._id,
        type: "Film",
        film: films[1]._id,
        startDate: new Date('2024-07-05'),
        endDate: new Date('2024-07-12'),
        price: films[1].pricePerDay * 7 
    },
];


const seedDB = async () => {
    await User.deleteMany({});
    await Serie.deleteMany({});
    await Film.deleteMany({});
    await Booking.deleteMany({});
  
    for (const user of users) {
        const newUser = new User(user);
        await newUser.save();
    }

    for (const film of films) {
        const newFilm = new Film(film);
        await newFilm.save();
    }

    for (const serie of series) {
        const newSerie = new Serie(serie);
        await newSerie.save();
    }

    for (const booking of bookings) {
        const newBooking = new Booking(booking);
        await newBooking.save();
    }
};

seedDB().then(() => {
    console.log(`Seeds creadas correctamente!`)
    mongoose.connection.close();
});