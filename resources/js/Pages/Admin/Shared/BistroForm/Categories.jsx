
const BistroGenres =["Rwandan","International", "African", "French", "Thai", "American", "British", "Italian", "Japanese", "Mexican", "Chinese", "Korean", "Japanese", "Bar-B-Q","Indian"]

const BistroStyles = ["Fast Food", "Casual Dining", "Fine Dining", "Cafés and Bakeries", "Buffet", "Bars and Pubs", "Food Trucks"];
const BistroSpecialities = ["Vegetarian / Vegan", "Seafood", "Steakhouse", "Desserts", "Coffee", "Healthy Food", "Family-friendly", "Romantic"]
const Occasions = ["Casual","Family&Group", "Special", "Business", ];
const Time_occasions = ["Breakfast", "Brunch", "Dinner", "Late-Night Eats" ];
const Dietary_restrictions = ["Not Available","Religious & Ethical Choices", "Allergies & Intolerances", ];
const Reservation = ["Reservation Required","Walk-ins Welcome", "Advance Reservation Recommended", ];

const Payment_options = [
	{id:0, method:"Cash", seen:false},
	{id:1, method:"Visa", seen:false},
	{id:2, method:"MasterCard", seen:false},
	{id:3, method:"American Express", seen:false},
	{id:4, method:"Discover", seen:false},
	{id:5, method:"JCB", seen:false},
	{id:6, method:"Debit Cards", seen:false},
	{id:7, method:"MOMO", seen:false},

]


export {BistroGenres, BistroStyles, BistroSpecialities, Occasions, Time_occasions,Dietary_restrictions,Payment_options,Reservation};