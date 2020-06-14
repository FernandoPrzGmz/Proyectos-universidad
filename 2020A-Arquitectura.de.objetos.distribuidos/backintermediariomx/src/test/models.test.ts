import { Booking } from "../models/Booking.model";
import { Category } from "../models/Category.model";
import { Publication } from "../models/Publication.model";
import { PublicationComment } from "../models/PublicationComment.model";
import { User } from "../models/User.model";
import { UserContact } from "../models/UserContact.model";
import { UserProfilePicture } from "../models/UserProfilePicture.model";

// Booking.findAll({
//     include: [{
//       model: Publication,
//       as: 'Publication',
//       include: [{
//         model: User,
//         as: 'PublicationOwner'
//       },{
//         model: PublicationComment,
//         as: 'Comments',
//         include: [{
//           model: User,
//           as: 'CommentOwner'
//         }]
//       }]
//     },{
//       model: User,
//       as: 'BookingBuyer'
//     }]
//   })
//   .then((res:any) => console.log('Booking', JSON.stringify(res, null, 2)) )
//   .catch((err:any) => console.log(err) );


Category.findAll()
  .then((res:any) => console.log('Category', JSON.stringify(res, null, 2)) )
  .catch((err:any) => console.log(err) );


// Publication.findAll({
//     include: [{
//       model: User,
//       as: 'PublicationOwner'
//     },{
//       model: PublicationComment,
//       as: 'Comments',
//       include: [{
//         model: User,
//         as: 'CommentOwner'
//       }]
//     }]
//   })
//   .then((res:any) => console.log('Publication', JSON.stringify(res, null, 2)) )
//   .catch((err:any) => console.log(err) );


// PublicationComment.findAll({
//     include: [ PublicationComment.associations.Owner ]
//   })
//   .then((res:any) => console.log('PublicationComment', JSON.stringify(res, null, 2)) )
//   .catch((err:any) => console.log(err) );


// User.findAll({
//     include: [
//       User.associations.ContactList,
//       User.associations.ProfilePictureList
//     ],
//   })
//   .then((res:any) => console.log('User', JSON.stringify(res, null, 2)) )
//   .catch((err:any) => console.log(err) );


// UserContact.findAll({
//     include: [UserContact.associations.User],
//   })
//   .then((res:any) => console.log('UserContact', JSON.stringify(res, null, 2)) )
//   .catch((err:any) => console.log(err) );


// UserProfilePicture.findAll()
//   .then((res:any) => console.log('UserProfilePicture', JSON.stringify(res, null, 2)) )
//   .catch((err:any) => console.log(err) );