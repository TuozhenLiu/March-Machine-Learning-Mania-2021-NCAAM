// https://observablehq.com/@mcmcclur/visualize-your-kaggle-brackets-for-march-madness@2589
import define1 from "/@jashkenas/inputs.js?v=3";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["MTeams.csv","https://static.observableusercontent.com/files/3a201b34bbb660b5f9d2cebb59e2375710b6ba4cd3af9c621273809fa9ac258c916540505585a31cbaa87c644656c2778bf5ad0039974f15ca0e5d24a8c10007"],["WNCAATourneySeeds.csv","https://static.observableusercontent.com/files/5c657627331cc523e6c6e322a20a54e9ed61d92d7c387d68506063cfc073c4b85cf742d9f71a26eca065f4ddedc34c26e5c0fdfa6a965e45971048767253c393"],["WNCAATourneyCompactResults.csv","https://static.observableusercontent.com/files/4660fcb66cc83eb54ecd539a51ca479bda26b8eb8600fd5d1947af79730347c8b961fca32ad46561e1cb796c5149675444c23e5a62c2ba6d4f948db337598a33"],["WTeams.csv","https://static.observableusercontent.com/files/2343c34f71a68388b057661e45b8c52a60cd9ba1ea937ed01cdc62012d1549bce584e779f4cad676f990896b76cde74be2b379526eb37f6865ed50f2b9958fc0"],["MNCAATourneySeeds@1.csv","https://static.observableusercontent.com/files/1bb7ffc23148b87d33700fc35b71cb4870572caf6b49ca59d1c2200462eeaf9af401b848c77d42f09570c560eda845207adf02b75adf9539e8fa6f02fee01e24"],["MNCAATourneyCompactResults@3.csv","https://static.observableusercontent.com/files/81aa481933c2c3542b1dcf4c08037ab024cda4f75764a3f9c7f6f1950aeb09e5ba61c3368aca0c3e02d48f5eb0da8fbabc8d6bf7656e08a61c6c70a9fad22c04"],["myW2019submission.csv","https://static.observableusercontent.com/files/e25b892ce8f38ebbab323d55dd98f0c471eaaf0bc58e4aafdab461adcb2ececb59facf8e44302bbbcd8024e646256cd8c14c465d296035d13d563c3d1368d9a2"],["myM2018submission.csv","https://static.observableusercontent.com/files/ea2650d5887842682b8b6c1f79dac1c0a67e169f222158ae8107ccfbcfdef2748deba49a1d99d37f6af1059e0563722bbaeac8372b0c28641885e37bfd0cea1e"],["Mens2019FifthPlace.csv","https://static.observableusercontent.com/files/a094f527627587bed9ab90de3be6b16874cc40723784c4ff5cf1ebe98ac7da1c13c4b984ea7c4a18028c7dd95a60fc46f376ac05abbdce97394c2498b3a010ec"],["Womens2019FirstPlace.csv","https://static.observableusercontent.com/files/e59bacd225b6dc55ca80cbadec925b47bc400d1e7f3b08e17322137facf49782cd195ecf6ff25577b7dc6d322218684d479c7b460cff379b5931e3a3baece90d"],["WNCAATourneySeeds@1.csv","https://static.observableusercontent.com/files/34e38a92ccddaac5f5adf1108b2f11083c1ff760493b92c7ac08dcad21efdb1ca55a1034cd42c0d306878223e8cc7e5482cd022ebc62820dffdd841a2ae64cea"],["MNCAATourneyCompactResults@5.csv","https://static.observableusercontent.com/files/f095577d00d46a6d4fff7ed1a3a5cc4404d1e634c218a03d53a9f088e910e8206068a015a6e3ce3754881dd46d7cb05ca7dc6fcb4968db29b1fd8f2ef0490293"],["MNCAATourneyCompactResults@6.csv","https://static.observableusercontent.com/files/c510621d3eb179b059f1bfbdf9205229c6d0bcf481a9872fe5ec4d99ae1d641df5c22e25d3f14b809ed4f42276704f57c7514f7ee92601d11385e45606c18bf2"],["MNCAATourneyCompactResults@8.csv","https://static.observableusercontent.com/files/e87677a22fb48ee6aa280d5a405dfac5ae5b67a3dcffa7d7b8ae4e298d10ebbc42d7d3f5d12ba4022344515b0f5f014aea5fd3e76207bb55cdaff1dff83db5b5"],["MNCAATourneyCompactResults@10.csv","https://static.observableusercontent.com/files/55e1ec4662939ddd53493eebb7637fc19c235ccb8d8376ad2da51e6a19b59dd610f9063375c0e873b66082241bb07ada1004c6ac0186a2906a60f6001d99eab1"],["MConferenceTourneyGames.csv","https://static.observableusercontent.com/files/07c879e5c311f0a871072336961099655e746813f9f4f5f2fc26ddd3742092dd8d7f74ad15717b7b65cc0e08f349024db6a974688b21a8fae545aac9756ac105"],["MNCAATourneyCompactResults@11.csv","https://static.observableusercontent.com/files/09e53bc777accb232068f16c6aeb34efd47713d31ba0de4579abf7cf581797e59992b589a20300bb1d73f62469adcde4df42a30459b763d824a7db48dab902a2"],["MNCAATourneyCompactResults@12.csv","https://static.observableusercontent.com/files/09e53bc777accb232068f16c6aeb34efd47713d31ba0de4579abf7cf581797e59992b589a20300bb1d73f62469adcde4df42a30459b763d824a7db48dab902a2"],["MNCAATourneyCompactResults@13.csv","https://static.observableusercontent.com/files/82c13a6808e31536e6cf3756c717568f646d763a5cdb3a76f025ec9cfe2f7f8269d4fda24d3fbb27e3e80dd70debd45ff3bc91f1bc25dee105801be54ff48821"],["MNCAATourneyCompactResults@17.csv","https://static.observableusercontent.com/files/88c604c12412e60c8f70ddc2d7e245872178dd82b91c9092ea49137c088a9c94a69081dc135cc3998874ac5503a2676ef1c7c46bb09725656a8cf5d540b43cb1"],["MNCAATourneyCompactResults@18.csv","https://static.observableusercontent.com/files/becf2cd565ad3696627e3c07c9a6f90ded4546c45b0fde0a19e75f3adc3c9b39166c95d37459b93cd32af3f584e32b3f2837dc89a83a135ebec1a2948d4d3e08"],["myM2019submission.csv","https://static.observableusercontent.com/files/1c0208f356484f3c05b88f479fa45a869f8bb923eb39263220497019d6e6490af71fc3a80e194cb0c4dffbfcc8a3c1f6f31ea5582b6af98ec7918203e73a216f"],["MNCAATourneyCompactResults@20.csv","https://static.observableusercontent.com/files/9a1ea4dd99e1e7d4f34cac3949c56b76750cb78a90c3265872df708ba75ec14055e794c5f2a772b9f29a5078d377090f5e38f8740d30791bef962a91f6d38acc"],["MNCAATourneyCompactResults@21.csv","https://static.observableusercontent.com/files/4bd3678f647aa6f65ecb1d051875c203a51036f53833b6ffadba959f3062e74357339f286438cd5ac56624a0e5b77ae6a16b8fb043bbaa443a80b5f5894fb9de"],["MNCAATourneyCompactResults@22.csv","https://static.observableusercontent.com/files/a6b3c3ff16e89259830c562c0ddf46c8fcbcb28a062c97cdf6a2e45559c895456aec7d265e6eb78f6e1ad38ef44ea036230eeb449a3769c52dfc2a3116f87d41"],["MNCAATourneyCompactResults@23.csv","https://static.observableusercontent.com/files/df72536147191e3391d7258d8f69a3d51b82a382ad45dc965cd6b32553c92f3eb9a29bc53221c44ac10c7e814ba9ff685f1a12013ff8d29af05f2025d994c2e0"],["MNCAATourneyCompactResults@24.csv","https://static.observableusercontent.com/files/c6db78973d160dd29cf524c7f155f20295bda41d75addcc21a8aa1f36acd4db063a2c74f2a7a0fc07163703a69e6fb86e21a592ca6664966a939075830c67012"],["MNCAATourneyCompactResults@26.csv","https://static.observableusercontent.com/files/626bd608803cf70b9b6c650a064df54fd3eac0d1ce063c75831976f9a6fc4aff54005e685bb134098027265bca2819e4e1a5b6b4a43fa46f684de87458a4f7d4"],["MNCAATourneyCompactResults@27.csv","https://static.observableusercontent.com/files/ad222030275e3deaa8acdb45c4487f7fab0682f079c4f22bd0463fa549262771f2c49c68fbdb0466b0a93067f9ae7517836f76efbf0534d87a8d6a9c1cb64780"],["MNCAATourneyCompactResults@28.csv","https://static.observableusercontent.com/files/db5b722971dc2c8ed92eea965e0ad9dd1c8af687a6efc7240bf5bff420e2bd9c9dfa87c7d43cae230eea4ce673131512246b199ef2362d446b15019233dadad5"],["MNCAATourneyCompactResults@29.csv","https://static.observableusercontent.com/files/2cc659eddc8190ec826dbe14bb654aeb5b4bf057c271049a68ee9ffa00dc64fc4567ef2c8069002ee71fb60ae15de82ffc748b83605d9b34d8ec6a632f4a0903"],["MNCAATourneyCompactResults@30.csv","https://static.observableusercontent.com/files/11588a4e8fc6c0e7a15a63a3ac0f05fc83edcc0cb1084fa3c2c28ff5f05f3d62924fe88db56f19e9a6372686de757ad1da24716e0f8e4f8b5f701d1278d2fa5b"],["MNCAATourneyCompactResults@31.csv","https://static.observableusercontent.com/files/7f3fef9f3cbb139d32886901be6aab4d5a2f58054558ddd22e9a3dffdc4d98c990b719c20de482ccefa55f0e217fdfe8557a7c521364187bb807df9e295bef83"],["MNCAATourneyCompactResults@33.csv","https://static.observableusercontent.com/files/e538004990cfae812b9a5fc152a9877db636312df0e0a50567522d32934560d2733b0794d44b6e4b4922cb5531cb6e2a5f2afc46d1203b1127c6a3696af18046"],["MNCAATourneyCompactResults@38.csv","https://static.observableusercontent.com/files/868db87c4e06493a702b5742f3ea37fe87887f45e577d3fc9c34d65e30940a37a4d8812510d4dade0ed72d1b92b06defe1bb8e35661b4ee6e3fc5385a3b1d9d3"],["WNCAATourneyCompactResults@2.csv","https://static.observableusercontent.com/files/79373a34c15e3db88c007a0bcb7ce9d1734d523cc796ed45e4e3662ecfff6439f75f6e8c64eb9219cf070e55d18b73c214208e63f453f960dae1630d402412a9"],["MNCAATourneyCompactResults@40.csv","https://static.observableusercontent.com/files/34a257923bb6906ed29012789b45b9cc564f54c5094103b47c5d4ad1b77a79b845eaa940cf814791886037f304625d13190ce0e6b5bbe5c329a05758a5247826"],["WNCAATourneyCompactResults@3.csv","https://static.observableusercontent.com/files/809eb538caebcf8353e88c132ce5aa07e1bfe1b5077290a2229ab61a3ac57ef6e5409b4ad69710dec43d185fb89b2cef7c756fe2f872a8fa10758b5823788512"],["w2021SubmitWX.csv","https://static.observableusercontent.com/files/24e9339fc370a6ec22e8251810bd8ac177de0028746cca9adfc44d228c614aa65bd25a7a36d947942175a7e71406cced4d65c025cd3940e08d358ec91ec1cdeb"],["MNCAATourneyCompactResults@41.csv","https://static.observableusercontent.com/files/411d26bbe9c504fd3c7e1df783062eea61fac84cb82e6fd51fa169e30f4193b2be8005b721caba27ee50f9b8d09297ca0ce05b1aa5a7a1fd1562e726e52bedbb"],["WNCAATourneyCompactResults@4.csv","https://static.observableusercontent.com/files/5876f1d89974c9be0d48998b082d78cff4ee34339bf8dfafb66e189640570caf02fac10d2ccce3ac094bc96436f711d25c3b06e1e1777a55f3cca1eb704c6726"],["MNCAATourneyCompactResults@42.csv","https://static.observableusercontent.com/files/000716168730cf3bad822b808683d61d5ea47d7b0dd903eedb7f8ca2bcd893518d5c741eef8694e87d998d8c045c4ec25aff4a3502ae7e44949adb8a6181b051"],["MNCAATourneyCompactResults@47.csv","https://static.observableusercontent.com/files/64d5b669dd26824c5699eb93d8d4bf070dc41c2f391282c7ac290b7e1b880c9c05e9bac8e7994aa8842aa4890c47ab81804e1e1d864d826da086eb949f8aad43"],["MNCAATourneyCompactResults@48.csv","https://static.observableusercontent.com/files/64d5b669dd26824c5699eb93d8d4bf070dc41c2f391282c7ac290b7e1b880c9c05e9bac8e7994aa8842aa4890c47ab81804e1e1d864d826da086eb949f8aad43"],["WNCAATourneyCompactResults@7.csv","https://static.observableusercontent.com/files/23a7af16576466dcabf45fac67b3c077c8050c33e56189f651c63a15cf87533079e714e3cae1a28473de2557f57c5c1b8d48c15fe9ac1ef0a387328e70258380"],["MNCAATourneyCompactResults@49.csv","https://static.observableusercontent.com/files/bfcd2aacbb8e038e406a2ece6329244b339a8605b625510cde97e5b800a27237ebba6c9d951b4e3881e658f897bf3ee344dcdbc2e7338f6c08595cfe2b9baaf5"],["WNCAATourneyCompactResults@8.csv","https://static.observableusercontent.com/files/97309b4cee98861c324f9f0549f134f4413a1bad40eba4cb1b9effa140ce215b808b14e7262eec745e3d4eaaca10fa2ae4005831e7dca79a45cb23a18aa0101c"],["WNCAATourneyCompactResults@9.csv","https://static.observableusercontent.com/files/bd9790ea9e7c77e524388b48630ea393534bfc3575f5771cd5fa9d439add1744ca0fb633d82d91fb277b53afc5fd79518b8d7eb5160c2e648da3fcd495280e57"],["MNCAATourneyCompactResults@50.csv","https://static.observableusercontent.com/files/f8928dae74d5064c9ce6c2a668e90cee1243b532976ee39e05524727d31a0d078da380646c61dcc95dc762dcdf3122ceedb4e9452f3a1a7b5c7497336063bbff"],["MNCAATourneyCompactResults@51.csv","https://static.observableusercontent.com/files/c6537d108510d025acca52b9755881e25f7d086e91b5bc26be7404b8d6d3fcd86c54697b2df50cc947bf63bf9703429827b135e3e36d7f2a7fef7792dd3dd125"],["WNCAATourneyCompactResults@10.csv","https://static.observableusercontent.com/files/cff902c7ed4d413771b0a2dc87aaf2dd187cebfc6a31f3a6f1b89f623b32d9b4f1855b0ea2e58bb0b5e8be16908fac28908c4983c05921d9a120badb0bb7aa4c"],["WNCAATourneyCompactResults@11.csv","https://static.observableusercontent.com/files/341a7e3c2bf09ae947b6934bb8d6262b6a1bc6370283c69313833b1d696cfe78bfed3b03523857a20c239c7a98e8d69286c851370b125ae83235c2e342618098"],["MNCAATourneyCompactResults@52.csv","https://static.observableusercontent.com/files/93e61d3fc2c745f1482221685536710500cce0a43a189b2b46f0ffc9aebac64248158059fd896d4347f9a64b6b9447faf6574a99e2d59ffcf0cc2e8542c44455"],["MConferenceTourneyGames@1.csv","https://static.observableusercontent.com/files/07c879e5c311f0a871072336961099655e746813f9f4f5f2fc26ddd3742092dd8d7f74ad15717b7b65cc0e08f349024db6a974688b21a8fae545aac9756ac105"],["MNCAATourneyCompactResults@53.csv","https://static.observableusercontent.com/files/b33bef820303d5ba549e77f4abdee80c7e9e009944636b83a4e630f2018f0ca8352555dc7d8675679f7576c49ba3da200d99390f40750b531f32b116de8263af"],["MNCAATourneyCompactResults@54.csv","https://static.observableusercontent.com/files/311f92ccb61a5ccf06100cc997aff279d72a87e09d42c5b56e746c489d9ccc5cf24f966d71df2ac025d0ac27d0e04f590ffc8de483388270978a65e8186bf0e2"],["WNCAATourneyCompactResults@13.csv","https://static.observableusercontent.com/files/a5206aca7e244c6e975416ce255410069f75588442283a3a4688da16628ce0445e9dc7c866756021066d02b8601879ea3712b9e091f1216cb09b1f25f7ff5521"],["MNCAATourneyCompactResults@55.csv","https://static.observableusercontent.com/files/311f92ccb61a5ccf06100cc997aff279d72a87e09d42c5b56e746c489d9ccc5cf24f966d71df2ac025d0ac27d0e04f590ffc8de483388270978a65e8186bf0e2"],["WNCAATourneyCompactResults@14.csv","https://static.observableusercontent.com/files/fa6b8819af52c8f398a7d8ac6cf7830123c8d8019849161c420c6e4733c7b8ce0a835195d17c46686e9d5843a82782aa195793cb050236c390e2f95020340f40"],["WNCAATourneyCompactResults@16.csv","https://static.observableusercontent.com/files/226a3bfcad561de2b2d2b3755268989baeb76de51e85f871236ce18cf7c05ee8357c8ef6d5a84bbf7fc3076f2b91079bb73f0b79cf4f5f84d5423aa74d31fbdb"],["WNCAATourneyCompactResults@17.csv","https://static.observableusercontent.com/files/3956dcc54365a64d6b1a6ab1762e3fbbc181270390277a6578eb049e259f19480d42beea89f760bd82a57495a95e95fc6b2c8bc1dbbb890a13f69083d8342916"],["MNCAATourneyCompactResults@56.csv","https://static.observableusercontent.com/files/81b7949472a9124374fd4f5bdc4ac93082b5fefae9c468a059bd6ea5b17632822a62fbb4ddaf1cdb42e94865476421a153fd833b01d3b64e1081bee9713cfc2c"],["WNCAATourneyCompactResults@19.csv","https://static.observableusercontent.com/files/d3b07e7e5add3fdf86d252c4c34be7346f768a709432fbf2c84f5f43023e681de3598e5284c6b2ee6f8104ed6caf6d7b8104f0228c60c3c54ac950dc687df879"],["MNCAATourneyCompactResults@57.csv","https://static.observableusercontent.com/files/b710e3897c5c7ab42833af01aabb6a491afd14c6c24e748162f876ffda1637d9263a1705d1c2ff17c474da63ec1260252c518b8f6beef554c4fbbc7195b6f4b5"],["WNCAATourneyCompactResults@20.csv","https://static.observableusercontent.com/files/0e9b32a335557abc1e5a2470ea7c3fb63439353f2dca50b8797a47f287027d3b3711baebb8379fb047dd4996a629cf915b9580382414bb5f6b679c2f0e616b8f"],["MNCAATourneyCompactResults@58.csv","https://static.observableusercontent.com/files/c5f82f57d021b63987dcff7ff93ef7397aaf6aa0793401c552a32a3f6ab491a13c500a977959e1afdccd2819123b4657ed8a618387709c82436adec5c7fb3efc"],["MNCAATourneyCompactResults@59.csv","https://static.observableusercontent.com/files/f0c45f12957ea1657cacfb45968da691ae92fcbaa9126964d26970af74aed755cb3e2b7a9ef3b9a7cc1d9b9dc2c03045109f74e5fefd73e15e569ac19cfaf65c"],["WNCAATourneyCompactResults@21.csv","https://static.observableusercontent.com/files/9fe8c626c9f4ae955eb6629f70b46416c77113e25295975b5572f1aefa57876f1c35816644f8fcde7d5a3922fbef88c16e9c5ee5a4bc52c39d1f088b78b2810e"],["MNCAATourneyCompactResults@60.csv","https://static.observableusercontent.com/files/98d96d95fde549e6318b5c4eeb844c12a5ada9cf50e81758ed4d6484a7fee753b2a405296077a3b704ddfaaa3fcdb473e28d09bdd9ccb33588807b9f30c2d039"],["WNCAATourneyCompactResults@22.csv","https://static.observableusercontent.com/files/a5d3bfaa525933b8a4a8522f31c113514f693a6c0ececfc0463cd4da0af8c001b3ce15580ed245c1c2b9de6896ab8a6fc2dd10a1afb5b56718c6bd2e5c48fbdd"],["MNCAATourneyCompactResults@62.csv","https://static.observableusercontent.com/files/ca3897ab2a717a3f3e31caa4ecdbfd03136cd2aaaf009a24548bb049b8153ca211182e09978cdf188d34e94e63e4f2ab152d3e672c0352d2bd3a1a7ccc393cf5"],["MNCAATourneyCompactResults@63.csv","https://static.observableusercontent.com/files/4714afed1ff667eed7401bc377c203785970e19cdb8e1a274b88facf75fdb1c5ee944d546c909e6b4a2cdf649c91dda98602fb053d0eeaf82e5d77d49c2895ca"],["WNCAATourneyCompactResults@23.csv","https://static.observableusercontent.com/files/5191766e54909e5f41cf7dbb11115578ba5bada663e60222e11b846c979067dfc858fa7d8f91078ff881c7747b97649590164a4f26596ef2b4efef632919afa3"],["MNCAATourneyCompactResults@65.csv","https://static.observableusercontent.com/files/d9210c92dac0a8e46d6aca0db360db6f21adee0726f5edc7241374e86f1bd2381728afad87c5abebe27b4c1875114daa6ee5ca51e2c02f90e3e7560e8150ec76"],["WNCAATourneyCompactResults@24.csv","https://static.observableusercontent.com/files/dbac677960d7ef8f20ac92c4b6cbd2cd33df87d4f4bc60ad41b4117e8cabf4d47a4d250c6f7f37e7e94a46149c701ffdd8fda4fb0a13a5ca5f4f8f448f5c0397"],["MNCAATourneyCompactResults@66.csv","https://static.observableusercontent.com/files/353a049c54e26b076ea22ffa7b8f50537429fc0885fb16293d746318275ea94fb9e4b0f0977b7cbf7eb62dee1c176c1da7cb0ac8889b90b4225c9379c835d88e"],["WNCAATourneyCompactResults@25.csv","https://static.observableusercontent.com/files/7059d018e2d3f87771f4716fb49fb8e8a77ad0ed371167ece2b289725cda8a8783c41467797373754ce6c9b15fef25c9d08a9380a92f583b6045b7ecee7963bb"],["MNCAATourneyCompactResults@67.csv","https://static.observableusercontent.com/files/14baa006a3cea22afd939d033b9abdcdeeeab571a6047259e91d536270fa40cb300ddd1720d7d38f74cf1b0a5208d2f4c6cbe91e44bf1d6ab1065cfe237e43be"],["WNCAATourneyCompactResults@26.csv","https://static.observableusercontent.com/files/1021047eae17fe0a5807fd51053ade51fa24263a929eedb6667e8804117d74a55e3a1e487de8693a9cf851815a5513247f989a3104145910f41d9775ad89b2ee"],["MNCAATourneyCompactResults@68.csv","https://static.observableusercontent.com/files/d13b5d9dc709304071a0883961f00f25cbf8139e6fec228795bad2de5f87d27749fe8c05fdd43d180fd184c79bdbc0cd0ecdd9514d7d32e1433d465df055d4dd"],["WNCAATourneyCompactResults@27.csv","https://static.observableusercontent.com/files/d81c186bdc3ebb7092d96e1296c10869995d44181821b1faab3024842491d8b83cbe66c9455427831c1548fa113b3e222179d606a83f351c36db83224d72783f"],["WNCAATourneyCompactResults@28.csv","https://static.observableusercontent.com/files/44bd20274c14d23d8e595df0cef3c636c401bcf204fdd97a1fd30106e0fa50cfc44ee726b7eac9bef0b8c7f0fd0000bae824a77095ad428335929f096df6f682"],["MNCAATourneyCompactResults@69.csv","https://static.observableusercontent.com/files/8963a9d6c6d1141b3ed87551cd87ba01f07197ae13db772fb4405a76f9c2157d3e68faef6696f8f77144df1194900554fe719260c0ff051607ba08620042cdee"],["WNCAATourneyCompactResults@30.csv","https://static.observableusercontent.com/files/5865af0f7b972f7cfe7e1bd4f0340c558f29caad5374e5bcfdaea0002858cd383ad4e91bba7a53ee0f1f1a0bcc1d5e442d598c0e8dfb5d0b72e0c2512df3dd74"],["MNCAATourneyCompactResults@70.csv","https://static.observableusercontent.com/files/684bc6061be17a0de1155b51fff3b7c06b6761deb168edb8e849af2aeba29b1e4ab4a3833229cc8f0e2f2102c4b3a6265ab836556b2bed87720966cd07676778"],["mSubmitYZ.csv","https://static.observableusercontent.com/files/3b69e51f66cb5ce64ddfa82c716e4a768dcb28d1d537db009d512bca55cd3dae28a85ab9cd3d4d3fe9b10a93d963c9a5d81f30e030fba4e860e7c00341f243d0"],["W2021SecondPlace.csv","https://static.observableusercontent.com/files/2419f94d7b6bb86a5ec9454e7f33d1d872843bc83e5d362d972ef0613bfa203402e1161806863ec1ca26767e070ef2802bc018e0b5f6a1c7defebd1c752ae6e4"]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Visualize your Kaggle brackets for March Madness`
)});
  main.variable(observer("topmatter")).define("topmatter", ["md"], function(md){return(
md`[Kaggle](https://www.kaggle.com/) runs an annual March Madness competition where competitors use data science to make predictions about the NCAA tournament. It's a little deeper than the standard bracket, though, since (in true stastistical fashion) we assess the *probability* of a particular outcome for each game. Once the game is played, your score is assessed using a "Log Loss" formula, as [described by Kaggle](https://www.kaggle.com/c/ncaaw-march-mania-2021/overview/evaluation). This notebook allows you to visualize the process.

You can begin by choosing an example from the example menu which shows my submissions for this year, as well as a few completed examples from past years. If you compete in the competition, you can also upload your own Kaggle prediction file. After you select or upload a data file, the corresponding bracket should appear with the games shaded according to the quality of your prediction. Green is good, red is bad, and almost white is near the middle. You can hover over a game to see the log loss score for that game. The overall, average log loss for all games is displayed as well.


Note that the tool does *not* use your predictions to propogate teams up the bracket. Rather, it displays games that have actually occurred and indicates the quality of your predictions via the shading and tooltip.

All the data comes from Kaggle's March Machine Learning Mania competitions for the [Men's](https://www.kaggle.com/c/ncaam-march-mania-2021/) and [Women's](https://www.kaggle.com/c/ncaaw-march-mania-2021/) tournaments. Thus, you can visualize a prediction file for any year covered by Kaggle's data.  That's

  * All men's tournaments since 1985 and
  * all women's tournaments since 1998.

Of course, 2020 isn't included and 2021 is only partway through.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You can also just browse past tournaments using [this notebook](https://observablehq.com/@mcmcclur/ncaa-brackets).`
)});
  main.variable(observer("input")).define("input", ["d3","Promises","FileAttachment","set_setup"], function(d3,Promises,FileAttachment,set_setup)
{
  let div = d3.create('div');
  div.append('h4').text('Examples');

  let sample_file = div.append('select');
  let init_option = sample_file
    .append('option')
    .property('value', 'none')
    .text(' --- ');
  sample_file
    .append('option')
    .property('value', 'myM2021submission')
    .text("My 2021 Men");
  sample_file
    .append('option')
    .property('value', 'w2021SubmitWX')
    .text("My 2021 Women");
  sample_file
    .append('option')
    .property('value', 'W2021SecondPlace')
    .text("2021 Women's 2nd place");
  sample_file
    .append('option')
    .property('value', 'myW2019submission')
    .text("My 2019 Women");
  sample_file
    .append('option')
    .property('value', 'myM2018submission')
    .text("My 2018 Men");
  sample_file
    .append('option')
    .property('value', 'Mens2019FifthPlace')
    .text("2019 Men's Fifth Place");
  sample_file
    .append('option')
    .property('value', 'Womens2019FirstPlace')
    .text("2019 Women's First Place");
  sample_file.on('change', async function() {
    let v = sample_file.property('value');
    let csv_text;
    if (v == 'myM2021submission') {
      // csv_text = await FileAttachment("myW2019submission.csv").text();
      Promises.delay()
        .then(async function() {
          csv_text = await FileAttachment("mSubmitYZ.csv").text();
        })
        .then(function() {
          set_setup(csv_text);
        });
    } else if (v == 'w2021SubmitWX') {
      // csv_text = await FileAttachment("myW2019submission.csv").text();
      Promises.delay()
        .then(async function() {
          csv_text = await FileAttachment("w2021SubmitWX.csv").text();
        })
        .then(function() {
          set_setup(csv_text);
        });
    } else if (v == 'W2021SecondPlace') {
      // csv_text = await FileAttachment("myW2019submission.csv").text();
      Promises.delay()
        .then(async function() {
          csv_text = await FileAttachment("W2021SecondPlace.csv").text();
        })
        .then(function() {
          set_setup(csv_text);
        });
    } else if (v == 'myW2019submission') {
      // csv_text = await FileAttachment("myW2019submission.csv").text();
      Promises.delay()
        .then(async function() {
          csv_text = await FileAttachment("myW2019submission.csv").text();
        })
        .then(function() {
          set_setup(csv_text);
        });
    } else if (v == 'myM2018submission') {
      Promises.delay()
        .then(async function() {
          csv_text = await FileAttachment("myM2018submission.csv").text();
        })
        .then(function() {
          set_setup(csv_text);
        });
    } else if (v == 'Mens2019FifthPlace') {
      Promises.delay()
        .then(async function() {
          csv_text = await FileAttachment("Mens2019FifthPlace.csv").text();
        })
        .then(function() {
          set_setup(csv_text);
        });
    } else if (v == 'Womens2019FirstPlace') {
      Promises.delay()
        .then(async function() {
          csv_text = await FileAttachment("Womens2019FirstPlace.csv").text();
        })
        .then(function() {
          set_setup(csv_text);
        });
    }
    file_input.node().value = null;
    init_option.node().disabled = true;
    // set_setup(csv_text);
  });
  div.append(() => sample_file.node());

  let file_input = div.append('input').attr('type', 'file');
  // Object.assign(file_input.node(), {
  //   onchange: function(evt) {
  //     let t = evt.target;
  //     let fr = new FileReader();
  //     fr.readAsText(t.files[0]);
  //     fr.onload = function(load) {
  //       let csv_text = load.explicitOriginalTarget.result;
  //       set_setup(csv_text);
  //     };
  //     sample_file.property('value', 'none');
  //   }
  // });

  file_input.node().addEventListener(
    "change",
    function() {
      sample_file.property('value', 'none');
      let ff = this.files[0];
      ff.text().then(o => set_setup(o));
    },
    false
  );

  return div.node();
}
);
  main.variable(observer("log_loss_display")).define("log_loss_display", ["d3","this_years_results","log_loss"], function(d3,this_years_results,log_loss)
{
  let div = d3
    .create('div')
    .attr('id', 'll')
    .style('height', '15px')
    .style('font-size', '20px')
    .style('text-align', 'center');
  let relevant_results = this_years_results.filter(
    o => !o.playin_flag && parseInt(o.WScore) > 1
  );
  console.log(relevant_results);
  let total_log_loss =
    d3.sum(relevant_results.map(log_loss)) / relevant_results.length;
  if (!isNaN(total_log_loss)) {
    div.text(`Average Log Loss = ${d3.format("0.5f")(total_log_loss)}`);
  }
  return div.node();
}
);
  main.variable(observer("brackets")).define("brackets", ["make_brackets"], function(make_brackets){return(
make_brackets()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Code`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`This main \`make_brackets\` function creates a \`div\` element, adds an absolutely positioned \`svg\` element on which we draw the connectors, then adds 63 absolutely positioned \`div\` elements to display the games.`
)});
  main.variable(observer("make_brackets")).define("make_brackets", ["d3","div_width","div_height","tourney_tree","connector","game_container"], function(d3,div_width,div_height,tourney_tree,connector,game_container){return(
function make_brackets() {
  let div = d3
    .create('div')
    .style('width', div_width + 'px')
    .style('height', div_height + 'px')
    .style('position', 'relative');

  let svg = div
    .append('svg')
    .attr('width', div_width)
    .attr('height', div_height)
    .style('width', div_width + 'px')
    .style('height', div_height + 'px')
    .style('position', 'absolute');

  // Draw connectors on the SVG background
  svg
    .selectAll('path.link')
    .data(tourney_tree.links())
    .join('path')
    .attr('class', function(d) {
      let label = 'link';
      if (
        d.target.data.WTeam &&
        d.target.data.LTeam &&
        d.source.data.WTeam &&
        d.source.data.LTeam &&
        (d.target.data.WTeam.TeamID == d.source.data.WTeam.TeamID ||
          d.target.data.WTeam.TeamID == d.source.data.LTeam.TeamID)
      ) {
        label = label + ' Team' + d.target.data.WTeam.TeamID;
      }
      return label;
    })
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('fill', 'none')
    .attr('d', connector);

  div
    .selectAll('div.game')
    .data(tourney_tree.descendants())
    .enter()
    .append(d => game_container(d));

  // Highlight a team's path through the tournament
  // on mouseenter.
  div
    .selectAll('.team')
    .on('mouseenter', function() {
      let class_label = d3
        .select(this)
        .attr('class')
        .split(' ')[2];
      div.selectAll('.team.' + class_label).style('background-color', '#dd2');
      div.selectAll('.game.' + class_label).style('border', 'solid 3px black');
      svg.selectAll('.link.' + class_label).attr('stroke-width', 3);
    })
    .on('mouseleave', function() {
      let class_label = d3
        .select(this)
        .attr('class')
        .split(' ')[2];
      div
        .selectAll('.team.' + class_label)
        .style('background-color', 'rgba(204,204,204,0)');
      div.selectAll('.game.' + class_label).style('border', 'solid 1px black');
      svg.selectAll('.link.' + class_label).attr('stroke-width', 1);
    });

  return div.node();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Components`
)});
  main.variable(observer("game_container")).define("game_container", ["get_predicted_probability","d3","team_width","game_height","team_container","tippy","format","pbcopy"], function(get_predicted_probability,d3,team_width,game_height,team_container,tippy,format,pbcopy){return(
function game_container(game) {
  //setup.game_cnt = setup.game_cnt + 1;
  let top_team, bot_team;
  if (game.data.WTeam) {
    if (game.data.WTeam.pos == 'top') {
      top_team = game.data.WTeam;
    } else if (game.data.WTeam.pos == 'bot') {
      bot_team = game.data.WTeam;
    }
  }
  if (game.data.LTeam) {
    if (game.data.LTeam.pos == 'top') {
      top_team = game.data.LTeam;
    } else if (game.data.LTeam.pos == 'bot') {
      bot_team = game.data.LTeam;
    }
  }
  let shade = '#ddd';
  if (
    game.data.WTeam &&
    game.data.LTeam &&
    game.data.WTeam.win & (game.data.WTeam.score > 1)
  ) {
    let pred = get_predicted_probability(
      game.data.WTeam.TeamID,
      game.data.LTeam.TeamID
    );
    // setup.log_loss = setup.log_loss - Math.log(pred);
    if (pred >= 0.5) {
      shade = d3.interpolateGreens(1.5 * (pred - 0.5));
    } else if (pred < 0.5) {
      shade = d3.interpolateReds(1.5 * (0.5 - pred));
    }
  }

  let div = d3
    .create('div')
    .style('background-color', shade)
    .style('width', function() {
      if (game.data.round == 6) {
        return 1.4 * team_width + 'px';
      } else {
        return team_width + 'px';
      }
    })
    .style('height', function() {
      if (game.data.round == 6) {
        return 1.4 * game_height + 'px';
      } else {
        return game_height + 'px';
      }
    })
    .style('left', function() {
      if (game.data.round == 6) {
        return (game.x2 - 0.2 * team_width).toString() + 'px';
      } else {
        return game.x2 + 'px';
      }
    })
    .style('top', function() {
      if (game.data.round == 6) {
        return (game.y2 - 0.2 * game_height).toString() + 'px';
      } else {
        return game.y2 + 'px';
      }
    })
    .style('border', 'solid 0.5px black')
    .style('position', 'absolute');

  div.append(() => team_container(top_team, game.data.round, 'top_team'));
  div.append(() => team_container(bot_team, game.data.round, 'bot_team'));

  if (
    game.data.WTeam &&
    game.data.WTeam.win &&
    game.data.LTeam &&
    game.data.WTeam.score > 1
  ) {
    let pred = get_predicted_probability(
      game.data.WTeam.TeamID,
      game.data.LTeam.TeamID
    );
    let game_log_loss = -Math.log(pred);

    tippy(div.node(), {
      content: `Prediction was that ${game.data.WTeam.TeamName} would beat ${
        game.data.LTeam.TeamName
      } with probabiltiy ${format(pred)} for a Log Loss of ${format(
        game_log_loss
      )}.`
    });
  } else if (
    game.data.WTeam &&
    game.data.WTeam.win &&
    game.data.LTeam &&
    game.data.WTeam.score == 1
  ) {
    tippy(div.node(), { content: "Game cancelled" });
  } else if (
    game.data.WTeam &&
    game.data.WTeam.TeamID &&
    game.data.LTeam &&
    game.data.LTeam.TeamID &&
    !game.data.WTeam.win
  ) {
    let pred = get_predicted_probability(
      game.data.WTeam.TeamID,
      game.data.LTeam.TeamID
    );
    let game_log_loss = -Math.log(pred);

    tippy(div.node(), {
      content: `Prediction is that ${game.data.WTeam.TeamName} will beat ${
        game.data.LTeam.TeamName
      } with probabiltiy ${format(pred)}.`
    });
  }

  // cmd-click on an unplayed game to copy a result template to update the result file
  div.on('click', function(evt) {
    if (evt.metaKey) {
      let result_text = `2021,,${game.data.WTeam.TeamID},WS,${game.data.LTeam.TeamID},LS,,
${game.data.WTeam.TeamName}, ${game.data.LTeam.TeamName}`;
      pbcopy(result_text);
    }
  });

  // if (
  //   game.data.WTeam &&
  //   game.data.WTeam.TeamID == 1116 &&
  //   game.data.LTeam &&
  //   game.data.LTeam.TeamID == 1403
  // ) {
  //   console.log(['problem is ', game.data]);
  // }

  return div.node();
}
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format('0.5f')
)});
  main.variable(observer("team_container")).define("team_container", ["d3","tippy"], function(d3,tippy){return(
function team_container(team, round, tb) {
  let div = d3
    .create('div')
    .style('background', 'rgba(204, 204, 204, 0)')
    .attr('class', function(d) {
      let label = 'team ' + tb + ' ';
      if (team && team.TeamID) {
        label = label + 'Team' + team.TeamID;
      }
      if (round == 6) {
        label = label + ' championship';
      }
      return label;
    });
  // Round 1 games display the seed and might have a play-in to highlight.
  if (round == 1) {
    let seed_span = div.append('span').text(team.seed + ' ');
    if (team.playin) {
      seed_span.style('color', 'blue');
      let title = 'Play-in info <br />';
      title = title + `${team.TeamName}: ${team.playin.score} <br /> `;
      title =
        title +
        `${team.playin.playin_opponent_name}: ${team.playin.playin_opponent_score}`;
      // seed_span.attr('title', title);
      // tippy(seed_span.node());
      tippy(seed_span.node(), { content: title, allowHTML: true });
    }
  }
  // Add name and score
  let team_display;
  if (team && team.TeamNames && team.score == 0) {
    team_display = team.TeamNames;
  } else if (team) {
    team_display = team.TeamName;
  }
  div.append('span').text(team_display);
  if (team && team.score) {
    div
      .append('span')
      .attr('class', 'score')
      .text(team.score);
  }

  return div.node();
}
)});
  main.variable(observer("connector")).define("connector", ["team_width","game_height","d3"], function(team_width,game_height,d3){return(
function connector(link) {
  if (link.target.data.round >= 2) {
    let x1 = link.source.x2;
    let y1 = link.source.y2;
    let x2 = link.target.x2;
    let y2 = link.target.y2;
    let xx1, yy1, xx2, yy2;

    let path;

    // We can tell whether we're linking up or down by
    // comparing expected seeds.
    let [seed1, seed2] = link.target.data.expected_seeds;
    // Upper links
    if (seed1 < seed2) {
      // Left half of bracket
      if (link.target.data.region == 'W' || link.target.data.region == 'Y') {
        xx1 = x1 + team_width / 2;
        yy1 = y1;
        xx2 = x2 + team_width;
        yy2 = y2 + game_height / 2;
        path = [[xx1, yy1], [xx1, yy2], [xx2, yy2]];
        return d3.line()(path);
      }
      // Right half of bracket
      else if (
        link.target.data.region == 'X' ||
        link.target.data.region == 'Z'
      ) {
        xx1 = x1 + team_width / 2;
        yy1 = y1;
        xx2 = x2;
        yy2 = y2 + game_height / 2;
        path = [[xx1, yy1], [xx1, yy2], [xx2, yy2]];
        return d3.line()(path);
      }
    }
    // Lower links
    else {
      // Left half of bracket
      if (link.target.data.region == 'W' || link.target.data.region == 'Y') {
        xx1 = x1 + team_width / 2;
        yy1 = y1 + game_height;
        xx2 = x2 + team_width;
        yy2 = y2 + game_height / 2;
        path = [[xx1, yy1], [xx1, yy2], [xx2, yy2]];
        return d3.line()(path);
      }
      // Right half of bracket
      else if (
        link.target.data.region == 'X' ||
        link.target.data.region == 'Z'
      ) {
        xx1 = x1 + team_width / 2;
        yy1 = y1 + game_height;
        xx2 = x2;
        yy2 = y2 + game_height / 2;
        path = [[xx1, yy1], [xx1, yy2], [xx2, yy2]];
        return d3.line()(path);
      }
    }
  } else {
    return null;
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Repositioning

A bit more complicated than I might have liked. \`d3.tree\` applied to a \`d3.hiearchy\` returns a lovely top-to-bottom layout. A standard trick to reorient that horizontally is to swap x and y. In the setup here, we've got to rearrange the four regions so that one half the bracket occupies the left half of the \`div\` while the other half occupies the right. In addition, we want the top two regions to feed into the top national semi-final and similarly for the bottom.`
)});
  main.variable(observer("horizontal_rescaler")).define("horizontal_rescaler", ["d3","div_width","team_width"], function(d3,div_width,team_width){return(
function horizontal_rescaler(d) {
  let region = d.data.region;
  let scaler;
  let s = 3; // A small amount to shift round 2 games
  
  // Upper right
  if (region == 'X' || region == 'WX') {
    if (d.data.round == 2) {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([
          0.5 * div_width - 1.5 * team_width - s,
          div_width - team_width - s
        ]);
    } else {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([0.5 * div_width - 1.5 * team_width, div_width - team_width]);
    }
  }
  // Upper left
  else if (region == 'W') {
    if (d.data.round == 2) {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([0.5 * (div_width + team_width) + s, s]);
    } else {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([0.5 * (div_width + team_width), 0]);
    }
  } 
  // Lower left
  else if (region == 'Y' || region == 'YZ') {
    if (d.data.round == 2) {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([0.5 * (div_width + team_width) + s, s]);
    } else {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([0.5 * (div_width + team_width), 0]);
    }
  } 
  // Lower right
  else if (region == 'Z') {
    if (d.data.round == 2) {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([
          0.5 * div_width - 1.5 * team_width - s,
          div_width - team_width - s
        ]);
    } else {
      scaler = d3
        .scaleLinear()
        .domain([0, div_width])
        .range([0.5 * div_width - 1.5 * team_width, div_width - team_width]);
    }
  } else if (region == 'CH')
    scaler = d3
      .scaleLinear()
      .domain([0, div_width])
      .range([0.5 * (div_width - team_width), 0]);

  return scaler(d.y);
}
)});
  main.variable(observer("vertical_rescaler")).define("vertical_rescaler", ["d3","div_height","game_height"], function(d3,div_height,game_height){return(
function vertical_rescaler(d) {
  let region = d.data.region;

  // Upper left
  if (region == 'W') {
    let scaler = d3
      .scaleLinear()
      .domain([-0.25 * div_height, 0.25 * div_height])
      .range([div_height - game_height / 2, -game_height / 2]);
    return scaler(d.x);
  }
  // Upper right
  else if (region == 'X') {
    let scaler = d3
      .scaleLinear()
      .domain([0, 0.5 * div_height])
      .range([div_height - game_height / 2, -game_height / 2]);
    return scaler(d.x);
  } 
  // Lower left
  else if (region == 'Y') {
    let scaler = d3
      .scaleLinear()
      .domain([div_height * 0.5, div_height])
      .range([div_height - game_height / 2, -game_height / 2]);
    return scaler(d.x);
  } 
  // Lower right
  else if (region == 'Z') {
    let scaler = d3
      .scaleLinear()
      .domain([div_height * 0.75, 1.25 * div_height])
      .range([div_height - game_height / 2, -game_height / 2]);
    return scaler(d.x);
  } else if (region == 'WX') {
    return 0.4 * div_height;
  } else if (region == 'YZ') {
    return 0.6 * div_height;
  } else if (region == 'CH') {
    return 0.5 * div_height;
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Contructing the tournament`
)});
  main.variable(observer("tourney_tree")).define("tourney_tree", ["d3","tourney","display_map","div_height","div_width","horizontal_rescaler","vertical_rescaler"], function(d3,tourney,display_map,div_height,div_width,horizontal_rescaler,vertical_rescaler)
{
  let tree = d3.hierarchy(tourney);
  tree.sort(function(x, y) {
    return (
      display_map.get(y.data.expected_seeds[0]) -
      display_map.get(x.data.expected_seeds[0])
    );
  });
  d3
    .tree()
    .separation((a, b) => (a.parent == b.parent ? 1 : 1.1) / a.depth)
    .size([div_height, div_width])(tree);

  tree.descendants().forEach(function(v) {
    v.x2 = horizontal_rescaler(v);
    v.y2 = vertical_rescaler(v);
  });

  return tree;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Here's where we actually construct the tournament based on the input data.`
)});
  main.variable(observer("tourney")).define("tourney", ["round1_info","get_pos","get_scores"], function(round1_info,get_pos,get_scores)
{
  // Start with a basic nested JSON tree down
  // to the regional finals.
  let tourney = {
    region: 'CH',
    round: 6,
    expected_seeds: [1, 1],
    children: [
      {
        region: 'WX',
        round: 5,
        expected_seeds: [1, 1],
        children: [
          {
            region: 'W',
            round: 4,
            expected_seeds: [1, 2]
          },
          {
            region: 'X',
            round: 4,
            expected_seeds: [1, 2]
          }
        ]
      },
      {
        region: 'YZ',
        round: 5,
        expected_seeds: [1, 1],
        children: [
          {
            region: 'Y',
            round: 4,
            expected_seeds: [1, 2]
          },
          {
            region: 'Z',
            round: 4,
            expected_seeds: [1, 2]
          }
        ]
      }
    ]
  };

  // Now we'll just use a basic tree-traversal technique
  // to continue down to round 1
  let stack = [
    tourney.children[0].children[0],
    tourney.children[0].children[1],
    tourney.children[1].children[0],
    tourney.children[1].children[1]
  ];
  while (stack.length > 0) {
    let node = stack.pop();
    let high_seed = node.expected_seeds[0];
    let new_low_seed = 2 ** (5 - node.round + 1) - high_seed + 1;
    let child0 = {
      region: node.region,
      expected_seeds: [high_seed, new_low_seed],
      round: node.round - 1
    };
    let low_seed = node.expected_seeds[1];
    let lower_seed = 2 ** (5 - node.round + 1) - low_seed + 1;
    let child1 = {
      region: node.region,
      expected_seeds: [lower_seed, low_seed],
      round: node.round - 1
    };
    node.children = [child0, child1];

    // If round > 2, then we'll just push both
    // new empty nodes to the stack. We don't yet
    // know whose playing in those games.
    if (node.round > 2) {
      stack.push(child0);
      stack.push(child1);
    }
    // If round == 2, then the children will be in round 1
    // so we can look up the game result.
    else {
      Object.assign(child0, round1_info(child0));
      Object.assign(child1, round1_info(child1));
    }
  }
  // At this point, the tree structure of the tournament is
  // constructed but we need to re-traverse to get game results.
  stack = [tourney];
  while (stack.length > 0) {
    let node = stack.pop();
    if (node.visits == 1) {
      node.visits = 2;
    } else {
      node.visits = 1;
    }
    let [child0, child1] = node.children;
    let team0, team1;
    if (child0.WTeam && child0.WTeam.win) {
      team0 = Object.assign({}, child0.WTeam);
      delete team0.win;
      delete team0.score;
      team0.pos = get_pos(team0.seed, node.round, team0.slot[0]);
      node.WTeam = team0; // Arbitrary, for now
    }
    if (child1.WTeam && child1.WTeam.win) {
      team1 = Object.assign({}, child1.WTeam);
      delete team1.win;
      delete team1.score;
      team1.pos = get_pos(team1.seed, node.round, team1.slot[0]);
      node.LTeam = team1; // Arbitrary, for now
    }
    // If we have both teams, then we attempt to assess the victor
    if (team0 && team1) {
      let scores = get_scores(team0.TeamID, team1.TeamID);
      team0.score = scores[0];
      team1.score = scores[1];
      let wTeam, lTeam;
      if (team0.score > team1.score) {
        team0.win = true;
        node.WTeam = team0;
        node.LTeam = team1;
      } else if (team0.score < team1.score) {
        team1.win = true;
        node.WTeam = team1;
        node.LTeam = team0;
      }
    }
    if (node.visits == 1) {
      stack.push(node);
      if (node.round > 2) {
        stack.push(child0);
        stack.push(child1);
      }
    }
  }
  return tourney;
}
);
  main.variable(observer("display_map")).define("display_map", function()
{
  let display_order = [1, 16, 9, 8, 5, 12, 13, 4, 3, 14, 11, 6, 7, 10, 15, 2];
  let display_map = new Map();
  display_order.forEach((d, i) => display_map.set(d, i + 1));
  return display_map;
}
);
  main.variable(observer("round1_info")).define("round1_info", ["get_team","get_scores","get_pos"], function(get_team,get_scores,get_pos){return(
function round1_info(o) {
  let team0 = get_team(o.region, o.expected_seeds[0]);
  let team1 = get_team(o.region, o.expected_seeds[1]);
  let scores = get_scores(team0.TeamID, team1.TeamID);
  team0.score = scores[0];
  team0.pos = get_pos(team0.seed, 1);
  team1.score = scores[1];
  team1.pos = get_pos(team1.seed, 1);

  let wTeam, lTeam;
  if (team0.score > team1.score) {
    wTeam = team0;
    wTeam.win = true;
    lTeam = team1;
  } else if (team0.score < team1.score) {
    wTeam = team1;
    wTeam.win = true;
    lTeam = team0;
  } else {
    wTeam = team0;
    wTeam.win = false;
    lTeam = team1;
  }
  return { WTeam: wTeam, LTeam: lTeam };
}
)});
  main.variable(observer("get_pos")).define("get_pos", function(){return(
function get_pos(seed, round, region) {
  let s;
  if (typeof seed == 'number') {
    s = seed;
  } else {
    s = parseInt(seed.slice(1, 3));
  }
  if (round <= 4) {
    let n;
    if (s % 2 == 1) {
      n = (s - 1) / 2;
    } else {
      n = 16 - s / 2;
    }
    let bits = n.toString(2).padStart(4, '0');
    let bit = bits[round - 1];
    if (bit == '0') {
      return 'top';
    } else {
      return 'bot';
    }
  } else {
    if ((region == 'W' || region == 'Y') && round == 5) {
      return 'top';
    } else if ((region == 'X' || region == 'Z') && round == 5) {
      return 'bot';
    } else if ((region == 'W' || region == 'X') && round == 6) {
      return 'top';
    } else if ((region == 'Z' || region == 'Y') && round == 6) {
      return 'bot';
    }
  }
}
)});
  main.variable(observer("get_team")).define("get_team", ["this_years_seeds","team_map","get_scores"], function(this_years_seeds,team_map,get_scores){return(
function get_team(region, expected_seed) {
  let slot, teamID, teamName, teamNames;
  let playin = false;
  if (expected_seed < 10) {
    slot = region + '0' + expected_seed.toString();
  } else {
    slot = region + expected_seed.toString();
  }
  let seed = this_years_seeds.map(d => d.Seed).indexOf(slot);
  if (seed > -1) {
    teamID = this_years_seeds[seed].TeamID;
    teamName = team_map.get(teamID);
  }
  // The data expresses round 1 seeds mostly just as you'd expect.
  // In the case of a play-in game, there's an 'a' or 'b' appended to
  // the two seeds you'd expect to find. Thus, if we didn't find the
  // seed above that means we've got a play-in game. We'll display
  // just the winner but include the results of the playin via a tooltip.
  else {
    let seeda = this_years_seeds.map(d => d.Seed).indexOf(slot + 'a');
    let seedb = this_years_seeds.map(d => d.Seed).indexOf(slot + 'b');
    if (seeda > -1) {
      let playin_opponentID, playin_opponent_name, playin_opponent_score, score;
      let teamIDa = this_years_seeds[seeda].TeamID;
      let teamNamea = team_map.get(teamIDa);
      let teamIDb = this_years_seeds[seedb].TeamID;
      let teamNameb = team_map.get(teamIDb);
      let scores = get_scores(teamIDa, teamIDb);
      if (scores[0] < scores[1]) {
        teamName = teamNameb;
        teamID = teamIDb;
        score = scores[1];
        playin_opponentID = teamIDa;
        playin_opponent_name = teamNamea;
        playin_opponent_score = scores[0];
      } else if (scores[0] > scores[1]) {
        teamName = teamNamea;
        teamID = teamIDa;
        score = scores[0];
        playin_opponentID = teamIDb;
        playin_opponent_name = teamNameb;
        playin_opponent_score = scores[1];
      } else {
        teamName = teamNamea;
        teamNames = teamNamea + '/' + teamNameb;
        score = 0;
        playin_opponent_name = teamNameb;
        playin_opponent_score = 0;
        playin_opponentID = teamIDb;
      }
      playin = {
        score: score,
        teamID: teamIDa,
        playin_opponentID: playin_opponentID,
        playin_opponent_name: playin_opponent_name,
        playin_opponent_score: playin_opponent_score
      };
    }
  }

  return {
    TeamName: teamName,
    TeamNames: teamNames,
    TeamID: teamID,
    seed: expected_seed,
    slot: slot,
    playin: playin
  };
}
)});
  main.variable(observer("get_scores")).define("get_scores", ["this_years_results"], function(this_years_results){return(
function get_scores(teamID1, teamID2) {
  let result = this_years_results.filter(function(o) {
    return (
      (o.WTeamID == teamID1 && o.LTeamID == teamID2) ||
      (o.WTeamID == teamID2 && o.LTeamID == teamID1)
    );
  });
  if (result.length == 1) {
    result = result[0];
    if (result.WTeamID == teamID1) {
      return [result.WScore, result.LScore].map(d => parseInt(d));
    } else if (result.LTeamID == teamID1) {
      return [result.LScore, result.WScore].map(d => parseInt(d));
    }
  } else {
    return [0, 0];
  }
}
)});
  main.variable(observer("get_predicted_probability")).define("get_predicted_probability", ["setup"], function(setup){return(
function get_predicted_probability(id1, id2) {
  let i, j;
  if (id1 < id2) {
    i = id1;
    j = id2;
  } else {
    i = id2;
    j = id1;
  }
  let found = setup.results.filter(function(o) {
    let [ir, jr] = o.id
      .split('_')
      .slice(1)
      .map(x => parseInt(x));
    if (i == ir && j == jr) {
      return true;
    }
  });
  if (found.length > 0) {
    if (id1 < id2) {
      return parseFloat(found[0].pred);
    } else {
      return 1 - parseFloat(found[0].pred);
    }
  } else {
    return 'none';
  }
}
)});
  main.variable(observer("log_loss")).define("log_loss", ["get_predicted_probability","cut"], function(get_predicted_probability,cut){return(
function log_loss(game) {
  let pred = get_predicted_probability(game.WTeamID, game.LTeamID);
  return -Math.log(cut(pred));
}
)});
  main.variable(observer("cut")).define("cut", function(){return(
function cut(x, eps = 1e-15) {
  let x2 = x;
  if (x < eps) {
    x2 = eps;
  } else if (x > 1 - eps) {
    x2 = 1 - eps;
  }
  return x2;
}
)});
  main.variable(observer("set_setup")).define("set_setup", ["d3","mutable setup"], function(d3,$0){return(
function set_setup(csv_file) {
  let p = csv_file.search('\n');
  let header = csv_file.slice(0, p).toLowerCase();
  csv_file = header + csv_file.slice(p);
  let results = d3.csvParse(csv_file);
  let year = parseInt(results[0].id.slice(0, 4));
  let sex = results[0].id.slice(10, 11);
  if (sex == '1') {
    sex = 'Men';
  } else {
    sex = 'Women';
  }
  $0.value = {
    men_or_women: sex,
    year: year,
    results: results,
    log_loss: 0
  };
}
)});
  main.define("initial setup", function(){return(
{}
)});
  main.variable(observer("mutable setup")).define("mutable setup", ["Mutable", "initial setup"], (M, _) => new M(_));
  main.variable(observer("setup")).define("setup", ["mutable setup"], _ => _.generator);
  main.variable(observer("pbcopy")).define("pbcopy", function(){return(
function pbcopy(text) {
  const fake = document.body.appendChild(document.createElement("textarea"));
  fake.style.position = "absolute";
  fake.style.left = "-9999px";
  fake.setAttribute("readonly", "");
  fake.value = "" + text;
  fake.select();
  try {
    return document.execCommand("copy");
  } catch (err) {
    return false;
  } finally {
    fake.parentNode.removeChild(fake);
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Data

The data comes from Kaggle's March madness competitions for [men](https://www.kaggle.com/c/google-cloud-ncaa-march-madness-2020-division-1-mens-tournament) and [women](https://www.kaggle.com/c/google-cloud-ncaa-march-madness-2020-division-1-womens-tournament).
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Filtered for the selected tournament.`
)});
  main.variable(observer("this_years_results")).define("this_years_results", ["setup","mresults","wresults","check_playin"], function(setup,mresults,wresults,check_playin)
{
  let results;
  if (setup.men_or_women == "Men") {
    results = mresults.filter(d => d.Season == setup.year);
  } else {
    results = wresults.filter(d => d.Season == setup.year);
  }
  results.map(function(o) {
    o.playin_flag = check_playin(o);
  });
  return results;
}
);
  main.variable(observer("this_years_seeds")).define("this_years_seeds", ["setup","mseeds","wseeds"], function(setup,mseeds,wseeds)
{
  if (setup.men_or_women == "Men") {
    return mseeds.filter(d => d.Season == setup.year);
  } else {
    return wseeds.filter(d => d.Season == setup.year);
  }
}
);
  main.variable(observer("check_playin")).define("check_playin", ["this_years_seeds"], function(this_years_seeds){return(
function check_playin(result) {
  let wteam_id = result.WTeamID;
  let wteam_seed = this_years_seeds.filter(o => o.TeamID == wteam_id)[0].Seed;
  if (wteam_seed.length == 4) {
    let lteam_id = result.LTeamID;
    let lteam_seed = this_years_seeds.filter(o => o.TeamID == lteam_id)[0].Seed;
    if (lteam_seed.length == 4) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### All the raw data`
)});
  main.variable(observer("wseeds")).define("wseeds", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("WNCAATourneySeeds@1.csv").text())
)});
  main.variable(observer("wresults")).define("wresults", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(
  await FileAttachment("WNCAATourneyCompactResults@30.csv").text()
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Maps to easily access team name from team ID`
)});
  main.variable(observer("team_map")).define("team_map", ["setup","mteam_map","wteam_map"], function(setup,mteam_map,wteam_map)
{
  if (setup.men_or_women == "Men") {
    return mteam_map;
  } else {
    return wteam_map;
  }
}
);
  main.variable(observer("wteam_map")).define("wteam_map", ["d3","FileAttachment"], async function(d3,FileAttachment)
{
  let wteams = d3.csvParse(await FileAttachment("WTeams.csv").text());
  let wteam_map = new Map();
  wteams.forEach(function(team) {
    wteam_map.set(team.TeamID, team.TeamName);
  });
  return wteam_map;
}
);
  main.variable(observer("mteam_map")).define("mteam_map", ["d3","FileAttachment"], async function(d3,FileAttachment)
{
  let mteams = d3.csvParse(await FileAttachment("MTeams.csv").text());
  let mteam_map = new Map();
  mteams.forEach(function(team) {
    mteam_map.set(team.TeamID, team.TeamName);
  });
  return mteam_map;
}
);
  main.variable(observer("mseeds")).define("mseeds", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("MNCAATourneySeeds@1.csv").text())
)});
  main.variable(observer("mresults")).define("mresults", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(
  await FileAttachment("MNCAATourneyCompactResults@70.csv").text()
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Imports`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  const child1 = runtime.module(define1);
  main.import("select", child1);
  main.import("radio", child1);
  main.variable(observer("tippy")).define("tippy", ["require"], function(require){return(
require("tippy.js@6")
)});
  main.variable(observer("style")).define("style", ["html","require"], async function(html,require){return(
html`<link rel="stylesheet" href="${await require.resolve(
  `tippy.js/themes/light.css`
)}">`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Parameters`
)});
  main.variable(observer("div_height")).define("div_height", ["screen"], function(screen){return(
0.85 * screen.availHeight
)});
  main.variable(observer("game_height")).define("game_height", ["div_height"], function(div_height){return(
div_height / 20
)});
  main.variable(observer("div_width")).define("div_width", ["width"], function(width){return(
width
)});
  main.variable(observer("team_width")).define("team_width", ["div_width"], function(div_width){return(
div_width / 9
)});
  main.variable(observer("styles")).define("styles", ["html","team_width","game_height"], function(html,team_width,game_height){return(
html`
<style>
  text {
    cursor: default
  }
  .team {
    cursor: default;
    width: ${team_width}px;
    height: ${game_height / 2}px;
    vertical-align: middle;
    line-height: ${game_height / 2}px;
    white-space: nowrap;
    overflow: hidden;
    font: 14px sans-serif;
    vertical-align: middle
 }
 .championship {
    cursor: default;
    width: ${1.4 * team_width}px;
    height: ${(1.4 * game_height) / 2}px;
    vertical-align: middle;
    line-height: ${game_height / 2}px;
    white-space: nowrap;
    overflow: hidden;
    font: 18px sans-serif;
    vertical-align: middle
 }
 .score {
    display: inline-block;
    position: absolute;
    right: 0px;
    color: white;
    background-color: #333333;
    height: ${game_height / 2}px;
  }
  .championship > .score {
    display: inline-block;
    position: absolute;
    right: 0px;
    color: white;
    background-color: #333333;
    height: ${(1.4 * game_height) / 2}px;
  }
  .top_team {
    background-color: #efefef
  }
  .bot_team {
    background-color: #dedede
  }
  .upset {
    background-color: #dd9999
  }
  .champion {
    background-color: #ffd700
  }

</style>`
)});
  return main;
}
