
const LocalityTypes = ["Local", "Expat", "Traveller"];

const BistroGenres =["Rwandan","International", "African", "French", "Thai", "American", "British", "Italian", "Japanese", "Mexican", "Chinese", "Korean", "Japanese", "Bar-B-Q","Indian"]

const BistroStyles = [ "Dining", "Cafés and Bakeries", "Buffet", "Bars and Pubs"];
const Occasions = ["Single", "Couple","Family", "Friends Gathering ", "Business"];
const Ambiences = ["Casual","Formal", "Relaxed", "Romatice", "Cozy", "Outdoor"];
const BistroSpecialities = ["All", "Fast Food","Vegan", "Seafood", "Steak", "Desserts", "Coffee", "Healthy Food", "Drinks", "Alcohol"]


const Time_occasions = ["Breakfast", "Brunch", "Dinner", "Late-Night Eats" ];
const Dietary_restrictions = ["Not Available","Religious & Ethical Choices", "Allergies & Intolerances", ];
const Reservation = ["Walk-ins Welcome", "Reservation Required" ,"Advance Reservation Recommended", ];


const Payment_options = [
	{id:0, method:"Cash", checked:false},
	{id:1, method:"Visa", checked:false},
	{id:2, method:"MasterCard", checked:false},
	{id:3, method:"American Express", checked:false},
	{id:4, method:"Discover", checked:false},
	{id:5, method:"JCB", checked:false},
	{id:6, method:"Debit Cards", checked:false},
	{id:7, method:"MOMO", checked:false},

]


export {BistroGenres, BistroStyles, BistroSpecialities, Occasions, Time_occasions,Dietary_restrictions,Payment_options,Reservation,Ambiences,LocalityTypes};