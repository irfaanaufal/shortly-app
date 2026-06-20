import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';

const PRESET_ICONS = [
    'Link2', 'Users', 'DollarSign', 'LifeBuoy', 'BookOpen', 'GraduationCap',
    'MessageSquare', 'Globe', 'Settings', 'Briefcase', 'Calendar', 'Mail',
    'Shield', 'Activity', 'Database', 'Code', 'Terminal', 'Cloud', 'Server',
    'FileText', 'Folder', 'Cpu', 'TrendingUp', 'Heart', 'HelpCircle',
    'Home', 'Search', 'Bell', 'Star', 'Layout', 'Grid', 'List', 'Layers',
    'PieChart', 'BarChart3', 'LineChart', 'GitBranch', 'GitCommit', 'GitPullRequest',
    'Lock', 'Unlock', 'Key', 'User', 'UserPlus', 'UserMinus', 'UserCheck', 'UsersRound',
    'Building', 'Building2', 'Factory', 'MapPin', 'Navigation2', 'Compass', 'Target',
    'Award', 'Trophy', 'Gift', 'Package', 'ShoppingCart', 'CreditCard', 'Banknote',
    'Wallet', 'Coin', 'Receipt', 'File', 'FileJson', 'FileSpreadsheet', 'FileCheck',
    'ClipboardList', 'ClipboardCheck', 'ScrollText', 'BookOpenCheck', 'Bookmark',
    'Share2', 'Share', 'Download', 'Upload', 'Send', 'Forward', 'Reply', 'ReplyAll',
    'Inbox', 'Mailbox', 'AtSign', 'Phone', 'Smartphone', 'Tablet', 'Monitor', 'Tv',
    'Printer', 'Headphones', 'Music', 'Video', 'Camera', 'Image', 'Mic', 'MicOff',
    'Volume2', 'VolumeX', 'Play', 'Pause', 'FastForward', 'Rewind', 'Repeat', 'Shuffle',
    'Sun', 'Moon', 'CloudRain', 'CloudLightning', 'Snowflake', 'Zap', 'Flame',
    'Droplets', 'Leaf', 'TreePine', 'Sprout', 'Anchor', 'Ship', 'Car', 'Bike',
    'Plane', 'Train', 'Bus', 'Truck', 'Gauge', 'Speedometer', 'Thermometer',
    'Clock', 'Hourglass', 'Timer', 'AlarmClock', 'CalendarCheck', 'CalendarDays',
    'CalendarPlus', 'CalendarMinus', 'CalendarX', 'Check', 'CheckCircle', 'CheckSquare',
    'X', 'XCircle', 'AlertCircle', 'AlertTriangle', 'Info', 'HelpCircle', 'Question',
    'ExternalLink', 'ArrowUpRight', 'ArrowDownRight', 'ArrowUpLeft', 'ArrowDownLeft',
    'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ArrowUp', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'Move', 'Maximize2', 'Minimize2', 'Expand', 'Shrink',
    'RefreshCw', 'RefreshCcw', 'RotateCw', 'RotateCcw', 'Repeat1', 'Rotate3D',
    'ZoomIn', 'ZoomOut', 'SearchCheck', 'SearchX', 'Filter', 'FilterX', 'SortAsc',
    'SortDesc', 'SlidersHorizontal', 'Settings2', 'AdjustmentsHorizontal', 'Tool',
    'Wrench', 'Hammer', 'Screwdriver', 'Wand2', 'Sparkles', 'Magic', 'TrendingDown',
    'TrendingUp', 'Minus', 'Plus', 'MinusCircle', 'PlusCircle', 'MinusSquare',
    'PlusSquare', 'Divide', 'Percent', 'Hash', 'AtSign', 'Asterisk', 'Hashtag',
    'Type', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'Code2', 'Quote',
    'ListOrdered', 'ListUnordered', 'Indent', 'Outdent', 'AlignLeft', 'AlignCenter',
    'AlignRight', 'AlignJustify', 'Highlighter', 'Eraser', 'Scissors', 'Copy',
    'Paste', 'Cut', 'Undo2', 'Redo2', 'Save', 'SaveAll', 'FolderOpen', 'FolderPlus',
    'FolderMinus', 'FolderX', 'FileEdit', 'FilePlus', 'FileMinus', 'FileX',
    'FileSearch', 'FileWarning', 'FileQuestion', 'FileCheck2', 'FileX2', 'FileSymlink',
    'FileLock', 'FileKey', 'FileVolume2', 'FileMusic', 'FileVideo', 'FileImage',
    'FileCog', 'FileSpreadsheet2', 'FileText2', 'FileJson2', 'FileOutput', 'FileInput',
    'DatabaseZap', 'DatabaseBackup', 'DatabaseSearch', 'DatabaseCheck', 'DatabaseX',
    'ServerOff', 'ServerCrash', 'CloudUpload', 'CloudDownload', 'CloudCog',
    'CloudRainWind', 'CloudLightningRain', 'CloudSun', 'CloudMoon', 'SunMedium',
    'MoonStar', 'Sunrise', 'Sunset', 'SunDim', 'Sun', 'Moon', 'CloudFog',
    'CloudHail', 'CloudSnow', 'Tornado', 'Umbrella', 'ThermometerSun', 'ThermometerSnowflake',
    'Wind', 'Cloud', 'Droplet', 'Droplets', 'SprayCan', 'FlaskConical', 'FlaskRound',
    'FlaskConicalOff', 'FlaskConicalOpen', 'FlaskRoundOff', 'FlaskRoundOpen',
    'TestTube', 'TestTube2', 'Microscope', 'Telescope', 'Binoculars', 'CameraOff',
    'VideoOff', 'Video', 'MicOff', 'Mic', 'HeadphonesOff', 'Headphones',
    'Speaker', 'SpeakerOff', 'SpeakerX', 'Volume1', 'Volume2', 'VolumeX',
    'Music2', 'Disc', 'Radio', 'MonitorSpeaker', 'Tv2', 'TvOff', 'MonitorOff',
    'SmartphoneOff', 'SmartphoneCharging', 'Battery', 'BatteryFull', 'BatteryLow',
    'BatteryMedium', 'BatteryCharging', 'BatteryWarning', 'BatteryOff', 'Plug',
    'PlugZap', 'Power', 'PowerOff', 'SwitchCamera', 'Maximize', 'Minimize',
    'Fullscreen', 'FullscreenExit', 'AspectRatio', 'AspectRatioPortrait', 'AspectRatioLandscape',
    'Crop', 'CropUnset', 'ImageOff', 'ImageMinus', 'ImagePlus', 'ImagePlay',
    'GalleryHorizontal', 'GalleryVertical', 'Slideshow', 'Panorama', 'LocateFixed',
    'LocateOff', 'Locate', 'Navigation', 'Navigation2Off', 'Map', 'MapPinOff',
    'MapPinned', 'MapCheck', 'MapX', 'Route', 'RouteX', 'Compass', 'CompassOff',
    'Anchor', 'Ship2', 'Sailboat', 'CarOff', 'CarFront', 'CarDoorOpen',
    'Fuel', 'GaugeHigh', 'GaugeLow', 'GaugeMedium', 'Luggage', 'WashingMachine',
    'Refrigerator', 'Oven', 'Microwave', 'Stove', 'Utensils', 'Coffee', 'Cafe',
    'Cookie', 'IceCream', 'Apple', 'Pizza', 'Sandwich', 'Beer', 'Wine',
    'Soda', 'Water', 'GlassWater', 'Mug', 'Package2', 'Box', 'BoxSelect',
    'Truck2', 'TruckFront', 'TruckPlane', 'PlaneLanding', 'PlaneTakeoff', 'PlaneOff',
    'TrainFront', 'TrainTrack', 'BusFront', 'Bike2', 'BikeOff', 'Motorbike',
    'Scooter', 'Unicycle', 'Helicopter', 'Rocket', 'Satellite', 'SatelliteDish',
    'Signal', 'Wifi', 'WifiOff', 'CellTower', 'RadioTower', 'Bluetooth', 'BluetoothOff',
    'Usb', 'HdmiPort', 'TypeC', 'TypeA', 'TypeB', 'EthernetPort', 'PhoneCall',
    'PhoneIncoming', 'PhoneOutgoing', 'PhoneMissed', 'PhoneOff', 'Voicemail', 'MessageCircle',
    'MessageCirclePlus', 'MessageSquarePlus', 'MessageSquareDashed', 'MessageSquareHeart',
    'MessageSquareCheck', 'MessageSquareX', 'MessagesSquare', 'MailCheck', 'MailOpen',
    'MailQuestion', 'MailWarning', 'MailX', 'Inbox2', 'InboxArchive', 'Send2',
    'Share2', 'Share', 'Forward2', 'Reply2', 'ReplyAll2', 'Forward2', 'Send',
    'MessageCircleHeart', 'MessageCircleWarning', 'MessageCircleDashed', 'MessageCircleCheck',
    'MessageCircleX', 'MessageCirclePlus', 'MessageCircleMinus', 'MessageCircleEdit',
    'MessageCircleCode', 'MessageCircleLock', 'MessageCircleUnlock', 'MessageCircleSearch',
    'MessageCircleSettings', 'MessageSquareHeart', 'MessageSquareWarning', 'MessageSquareDashed',
    'MessageSquareCheck', 'MessageSquareX', 'MessageSquarePlus', 'MessageSquareMinus',
    'MessageSquareEdit', 'MessageSquareCode', 'MessageSquareLock', 'MessageSquareUnlock',
    'MessageSquareSearch', 'MessageSquareSettings', 'Heart2', 'HeartOff', 'HeartPulse',
    'StarOff', 'StarHalf', 'Star', 'StarPlus', 'StarMinus', 'StarX', 'Award',
    'Trophy', 'Medal', 'Badge', 'BadgeCheck', 'BadgeX', 'BadgeMinus', 'BadgePlus',
    'BadgePercent', 'BadgeDollarSign', 'BadgeJapaneseYen', 'BadgeSwissFranc', 'BadgeIndianRupee',
    'BadgeBrazilianReal', 'BadgeEuro', 'BadgePoundSterling', 'BadgeRussianRuble', 'BadgeTurkishLira',
    'BadgeArabicDinar', 'BadgeBangladeshiTaka', 'BadgeBitcoin', 'BadgeNaira', 'BadgeNorwegianKrone',
    'BadgeSwedishKrona', 'BadgeCanadianDollar', 'BadgeAustralianDollar', 'BadgeNewTaiwanDollar',
    'BadgeKoreanWon', 'BadgeChineseYuan', 'BadgeSriLankanRupee', 'BadgeUzbekistanSom',
    'BadgePhilippinePeso', 'BadgeVietnameseDong', 'BadgeArmenianDram', 'BadgeAzerbaijaniManat',
    'BadgeGeorgianLari', 'BadgeKyrgyzstaniSom', 'BadgeKazakhstaniTenge', 'BadgeTajikistaniSomoni',
    'BadgeTurkmenistaniManat', 'BadgeUkrainianHryvnia', 'BadgeUruguayanPeso', 'BadgeArgentinePeso',
    'BadgeChileanPeso', 'BadgeColombianPeso', 'BadgePeruvianSol', 'BadgeVenezuelanBolívar',
    'BadgeMexicanPeso', 'BadgeCubanPeso', 'BadgeDominicanPeso', 'BadgeHaitianGourde',
    'BadgeJamaicanDollar', 'BadgeBarbadianDollar', 'BadgeTrinidadAndTobagoDollar',
    'BadgeCaymanIslandsDollar', 'BadgeBahamianDollar', 'BadgeBermudianDollar',
    'BadgeBritishVirginIslandsDollar', 'BadgeUnitedStatesVirginIslandsDollar',
    'BadgeEasternCaribbeanDollar', 'BadgeArubanFlorin', 'BadgeNetherlandsAntilleanGuilder',
    'BadgeCuraçaoanGuilder', 'BadgeSintMaartenianGuilder', 'BadgeBonaireanFlorin',
    'BadgeSabaFlorin', 'BadgeSaintEustatiusFlorin', 'BadgeSaintMaartenianGuilder',
    'BadgeTurksAndCaicosIslandsDollar', 'BadgeFalklandIslandsPound', 'BadgeSaintHelenaPound',
    'BadgeGibraltarPound', 'BadgeBritishIndianOceanTerritoryRupee', 'BadgeChristmasIslandDollar',
    'BadgeCocosIslandsDollar', 'BadgeNorfolkIslandDollar', 'BadgeNiueDollar', 'BadgePitcairnIslandsDollar',
    'BadgeTokelauDollar', 'BadgeTuvaluDollar', 'BadgeWallisAndFutunaDollar', 'BadgeFrenchPolynesianFranc',
    'BadgeNewCaledonianFranc', 'BadgeVanuatuVatu', 'BadgeSolomonIslandsDollar', 'BadgeFijianDollar',
    'BadgeSamoanTala', 'BadgeTonganPaanga', 'BadgeMarshallIslandsDollar', 'BadgeMicronesianDollar',
    'BadgePalauanDollar', 'BadgeNauruanDollar', 'BadgeKiribatiDollar', 'BadgeTuvaluanDollar',
    'BadgeFijianDollar', 'BadgeSolomonIslandsDollar', 'BadgeVanuatuVatu', 'BadgeNewCaledonianFranc',
    'BadgeFrenchPolynesianFranc', 'BadgeWallisAndFutunaDollar', 'BadgeTokelauDollar',
    'BadgeNiueDollar', 'BadgeNorfolkIslandDollar', 'BadgeCocosIslandsDollar', 'BadgeChristmasIslandDollar',
    'BadgeBritishIndianOceanTerritoryRupee', 'BadgeGibraltarPound', 'BadgeSaintHelenaPound',
    'BadgeFalklandIslandsPound', 'BadgeTurksAndCaicosIslandsDollar', 'BadgeSaintMaartenianGuilder',
    'BadgeSabaFlorin', 'BadgeSaintEustatiusFlorin', 'BadgeCuraçaoanGuilder', 'BadgeArubanFlorin',
    'BadgeEasternCaribbeanDollar', 'BadgeUnitedStatesVirginIslandsDollar', 'BadgeBritishVirginIslandsDollar',
    'BadgeCaymanIslandsDollar', 'BadgeBahamianDollar', 'BadgeBermudianDollar', 'BadgeBarbadianDollar',
    'BadgeJamaicanDollar', 'BadgeHaitianGourde', 'BadgeDominicanPeso', 'BadgeCubanPeso',
    'BadgeMexicanPeso', 'BadgeVenezuelanBolívar', 'BadgePeruvianSol', 'BadgeColombianPeso',
    'BadgeChileanPeso', 'BadgeArgentinePeso', 'BadgeUruguayanPeso', 'BadgeUkrainianHryvnia',
    'BadgeTurkmenistaniManat', 'BadgeTajikistaniSomoni', 'BadgeKazakhstaniTenge', 'BadgeKyrgyzstaniSom',
    'BadgeGeorgianLari', 'BadgeAzerbaijaniManat', 'BadgeArmenianDram', 'BadgePhilippinePeso',
    'BadgeVietnameseDong', 'BadgeSriLankanRupee', 'BadgeChineseYuan', 'BadgeKoreanWon',
    'BadgeNewTaiwanDollar', 'BadgeAustralianDollar', 'BadgeCanadianDollar', 'BadgeSwedishKrona',
    'BadgeNorwegianKrone', 'BadgeNaira', 'BadgeBitcoin', 'BadgeBangladeshiTaka', 'BadgeArabicDinar',
    'BadgeTurkishLira', 'BadgeRussianRuble', 'BadgePoundSterling', 'BadgeEuro', 'BadgeBrazilianReal',
    'BadgeIndianRupee', 'BadgeSwissFranc', 'BadgeJapaneseYen', 'BadgeDollarSign', 'BadgePercent',
    'BadgeMinus', 'BadgePlus', 'BadgeX', 'BadgeCheck', 'BadgeAlert', 'BadgeInfo', 'BadgeHelp',
    'BadgeArrowUp', 'BadgeArrowDown', 'BadgeArrowLeft', 'BadgeArrowRight', 'BadgeArrowUpRight',
    'BadgeArrowDownRight', 'BadgeArrowUpLeft', 'BadgeArrowDownLeft', 'BadgeChevronUp', 'BadgeChevronDown',
    'BadgeChevronLeft', 'BadgeChevronRight', 'BadgeMenu', 'BadgeGrid', 'BadgeList', 'BadgeLayers',
    'BadgeColumns', 'BadgeLayout', 'BadgeFile', 'BadgeFolder', 'BadgeImage', 'BadgeVideo',
    'BadgeAudio', 'BadgeMail', 'BadgeMessage', 'BadgePhone', 'BadgeSmartphone', 'BadgeTablet',
    'BadgeMonitor', 'BadgeTv', 'BadgePrinter', 'BadgeHeadphones', 'BadgeCamera', 'BadgeMic',
    'BadgeVolume', 'BadgePlay', 'BadgePause', 'BadgeStop', 'BadgeRewind', 'BadgeFastForward',
    'BadgeRepeat', 'BadgeShuffle', 'BadgeSkipForward', 'BadgeSkipBack', 'BadgeRefresh', 'BadgeRotate',
    'BadgeZoomIn', 'BadgeZoomOut', 'BadgeFilter', 'BadgeSearch', 'BadgeCheck', 'BadgeX',
    'BadgePlus', 'BadgeMinus', 'BadgeStar', 'BadgeHeart', 'BadgeBookmark', 'BadgeFlag',
    'BadgePin', 'BadgeAnchor', 'BadgeLink', 'BadgeExternalLink', 'BadgeShare', 'BadgeSave',
    'BadgeDownload', 'BadgeUpload', 'BadgeClipboard', 'BadgeCopy', 'BadgeCut', 'BadgePaste',
    'BadgeUndo', 'BadgeRedo', 'BadgeEdit', 'BadgeEraser', 'BadgeHighlighter', 'BadgeType',
    'BadgeBold', 'BadgeItalic', 'BadgeUnderline', 'BadgeStrikethrough', 'BadgeCode', 'BadgeQuote',
    'BadgeListOrdered', 'BadgeListUnordered', 'BadgeIndent', 'BadgeOutdent', 'BadgeAlignLeft',
    'BadgeAlignCenter', 'BadgeAlignRight', 'BadgeAlignJustify', 'BadgeSliders', 'BadgeSettings',
    'BadgeTool', 'BadgeWrench', 'BadgeHammer', 'BadgeScrewdriver', 'BadgeWand', 'BadgeSparkles',
    'BadgeMagic', 'BadgeTrendingUp', 'BadgeTrendingDown', 'BadgePieChart', 'BadgeBarChart',
    'BadgeLineChart', 'BadgeActivity', 'BadgeGitBranch', 'BadgeGitCommit', 'BadgeGitPullRequest',
    'BadgeLock', 'BadgeUnlock', 'BadgeKey', 'BadgeUser', 'BadgeUsers', 'BadgeUserPlus',
    'BadgeUserMinus', 'BadgeUserCheck', 'BadgeUserX', 'BadgeUserLock', 'BadgeUserUnlock',
    'BadgeUserSearch', 'BadgeUserSettings', 'BadgeUserEdit', 'BadgeBuilding', 'BadgeFactory',
    'BadgeMapPin', 'BadgeNavigation', 'BadgeCompass', 'BadgeTarget', 'BadgeAward', 'BadgeTrophy',
    'BadgeGift', 'BadgePackage', 'BadgeShoppingCart', 'BadgeCreditCard', 'BadgeBanknote',
    'BadgeWallet', 'BadgeCoin', 'BadgeReceipt', 'BadgeFileText', 'BadgeFileJson',
    'BadgeFileSpreadsheet', 'BadgeFileCheck', 'BadgeClipboardList', 'BadgeClipboardCheck',
    'BadgeScrollText', 'BadgeBookOpen', 'BadgeBookOpenCheck', 'BadgeBookmark', 'BadgeShare2',
    'BadgeShare', 'BadgeDownload', 'BadgeUpload', 'BadgeSend', 'BadgeForward', 'BadgeReply',
    'BadgeReplyAll', 'BadgeInbox', 'BadgeMailbox', 'BadgeAtSign', 'BadgePhone', 'BadgeSmartphone',
    'BadgeTablet', 'BadgeMonitor', 'BadgeTv', 'BadgePrinter', 'BadgeHeadphones', 'BadgeMusic',
    'BadgeVideo', 'BadgeCamera', 'BadgeImage', 'BadgeMic', 'BadgeMicOff', 'BadgeVolume2',
    'BadgeVolumeX', 'BadgePlay', 'BadgePause', 'BadgeFastForward', 'BadgeRewind', 'BadgeRepeat',
    'BadgeShuffle', 'BadgeSun', 'BadgeMoon', 'BadgeCloudRain', 'BadgeCloudLightning',
    'BadgeSnowflake', 'BadgeZap', 'BadgeFlame', 'BadgeDroplets', 'BadgeLeaf', 'BadgeTreePine',
    'BadgeSprout', 'BadgeAnchor', 'BadgeShip', 'BadgeCar', 'BadgeBike', 'BadgePlane',
    'BadgeTrain', 'BadgeBus', 'BadgeTruck', 'BadgeGauge', 'BadgeSpeedometer', 'BadgeThermometer',
    'BadgeClock', 'BadgeHourglass', 'BadgeTimer', 'BadgeAlarmClock', 'BadgeCalendarCheck',
    'BadgeCalendarDays', 'BadgeCalendarPlus', 'BadgeCalendarMinus', 'BadgeCalendarX',
    'BadgeCheck', 'BadgeCheckCircle', 'BadgeCheckSquare', 'BadgeX', 'BadgeXCircle',
    'BadgeAlertCircle', 'BadgeAlertTriangle', 'BadgeInfo', 'BadgeHelpCircle', 'BadgeQuestion'
];

const PRESET_COLORS = [
    { name: 'Blue-Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Blue-Indigo', value: 'from-blue-600 to-indigo-700' },
    { name: 'Sky-Cyan', value: 'from-sky-400 to-cyan-500' },
    { name: 'Indigo-Purple', value: 'from-indigo-500 to-purple-700' },
    { name: 'Violet-Pink', value: 'from-violet-500 to-pink-600' },
    { name: 'Fuchsia-Pink', value: 'from-fuchsia-500 to-pink-700' },
    { name: 'Pink-Rose', value: 'from-pink-500 to-rose-600' },
    { name: 'Rose-Red', value: 'from-rose-500 to-red-600' },
    { name: 'Red-Orange', value: 'from-red-500 to-orange-500' },
    { name: 'Orange-Amber', value: 'from-orange-500 to-amber-600' },
    { name: 'Amber-Yellow', value: 'from-amber-500 to-yellow-500' },
    { name: 'Yellow-Lime', value: 'from-yellow-500 to-lime-500' },
    { name: 'Lime-Green', value: 'from-lime-500 to-green-600' },
    { name: 'Green-Emerald', value: 'from-green-500 to-emerald-600' },
    { name: 'Emerald-Teal', value: 'from-emerald-500 to-teal-600' },
    { name: 'Teal-Cyan', value: 'from-teal-500 to-cyan-600' },
    { name: 'Cyan-Sky', value: 'from-cyan-500 to-sky-500' },
    { name: 'Purple-Fuchsia', value: 'from-purple-500 to-fuchsia-600' },
    { name: 'Violet-Rose', value: 'from-violet-600 to-rose-700' },
    { name: 'Sky-Purple', value: 'from-sky-500 to-violet-600' },
    { name: 'Slate-Gray', value: 'from-slate-600 to-gray-700' },
    { name: 'Zinc-Neutral', value: 'from-zinc-600 to-neutral-800' },
    { name: 'Gray-Stone', value: 'from-gray-600 to-stone-700' },
    { name: 'Stone-Stone', value: 'from-stone-500 to-stone-700' },
    { name: 'Orange-Rose', value: 'from-orange-500 to-rose-500' },
    { name: 'Cyan-Pink', value: 'from-cyan-500 to-pink-600' },
    { name: 'Blue-Yellow', value: 'from-blue-500 to-yellow-500' },
    { name: 'Green-Red', value: 'from-green-500 to-rose-500' },
    { name: 'Purple-Yellow', value: 'from-purple-600 to-yellow-500' },
    { name: 'Indigo-Green', value: 'from-indigo-500 to-green-500' },
    { name: 'Teal-Red', value: 'from-teal-500 to-rose-600' },
    { name: 'Slate-Orange', value: 'from-slate-600 to-orange-500' },
    { name: 'Zinc-Cyan', value: 'from-zinc-700 to-cyan-500' },
    { name: 'Black-Gray', value: 'from-gray-900 to-gray-700' },
    { name: 'White-Slate', value: 'from-white to-slate-100' },
    { name: 'Pink-Sky', value: 'from-pink-500 to-sky-500' },
    { name: 'Emerald-Purple', value: 'from-emerald-500 to-purple-700' },
    { name: 'Amber-Purple', value: 'from-amber-500 to-purple-700' },
    { name: 'Rose-Indigo', value: 'from-rose-500 to-indigo-700' }
];

const DynamicIcon = ({ name, className }) => {
    const IconComponent = Icons[name] || Icons.Link2;
    return <IconComponent className={className} />;
};

const formatUrl = (url) => {
    const trimmed = (url || '').trim();
    if (!trimmed) return trimmed;
    if (/^[a-zA-Z][a-zA-Z0-9.+-]*:\/\//.test(trimmed)) {
        return trimmed;
    }
    if (trimmed.startsWith('/')) {
        return `http://hfg093wdn44.sn.mynetname.net${trimmed}`;
    }
    return `http://hfg093wdn44.sn.mynetname.net/${trimmed}`;
};

export default function Edit({ shortcut }) {
    const { data, setData, put, processing, errors, transform } = useForm({
        name: shortcut.name || '',
        url: shortcut.url || '',
        description: shortcut.description || '',
        icon: shortcut.icon || 'Link2',
        color: shortcut.color || 'from-blue-500 to-cyan-500',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            url: formatUrl(data.url),
        }));
        put(route('shortcuts.update', shortcut.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Ubah Shortcut: ${shortcut.name}`} />

            <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 antialiased transition-colors duration-200">
                <div className="max-w-2xl mx-auto">
                    {/* Header Path */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-450 dark:text-neutral-500 mb-6">
                        <Link href={route('dashboard')} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            Dashboard
                        </Link>
                        <Icons.ChevronRight className="w-3 h-3" />
                        <span className="text-neutral-900 dark:text-neutral-50">Ubah Shortcut</span>
                    </div>

                    <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                        {/* Title Header */}
                        <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#1a1a1a]/50 flex items-center gap-3">
                            <div className="p-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl">
                                <Icons.Pencil className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                                    Ubah Shortcut
                                </h2>
                                <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-0.5">
                                    Sesuaikan detail, deskripsi, warna, atau ikon untuk pintasan ini.
                                </p>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Input Nama */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                                    Nama Aplikasi / Shortcut <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                                    placeholder="Contoh: HRIS, Jira, Wiki"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.name}</p>
                                )}
                            </div>

                            {/* Input URL */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                                    Tautan URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                                    placeholder="http://hfg093wdn44.sn.mynetname.net/path atau /path atau https://example.com"
                                />
                                {data.url && (
                                    <div className="mt-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                                        Preview URL: <span className="font-mono text-neutral-600 dark:text-neutral-300 break-all">{formatUrl(data.url)}</span>
                                    </div>
                                )}
                                {errors.url && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.url}</p>
                                )}
                            </div>

                            {/* Input Deskripsi */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                                    Deskripsi Singkat (Opsional)
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500 min-h-[90px] resize-y"
                                    placeholder="Deskripsi fungsi shortcut ini..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.description}</p>
                                )}
                            </div>

                            {/* Pemilihan Icon Preset */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 uppercase tracking-wider">
                                    Pilih Ikon <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 max-h-[160px] overflow-y-auto p-3 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl">
                                    {PRESET_ICONS.map((iconName) => {
                                        const isSelected = data.icon === iconName;
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setData('icon', iconName)}
                                                className={`flex items-center justify-center p-3 rounded-xl border transition-all ${
                                                    isSelected
                                                        ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-md scale-105'
                                                        : 'bg-white border-neutral-200 dark:bg-[#1e1e1e] dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                                                }`}
                                                title={iconName}
                                            >
                                                <DynamicIcon name={iconName} className="w-5 h-5" />
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.icon && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.icon}</p>
                                )}
                            </div>

                            {/* Pemilihan Warna Preset */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 uppercase tracking-wider">
                                    Gradasi Warna Latar <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[160px] overflow-y-auto bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl p-3">
                                    {PRESET_COLORS.map((colorObj) => {
                                        const isSelected = data.color === colorObj.value;
                                        return (
                                            <button
                                                key={colorObj.value}
                                                type="button"
                                                onClick={() => setData('color', colorObj.value)}
                                                className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all text-left text-xs font-semibold ${
                                                    isSelected
                                                        ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-md scale-[1.02]'
                                                        : 'bg-white border-neutral-200 dark:bg-[#1e1e1e] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                                                }`}
                                            >
                                                <span className={`w-4 h-4 rounded-lg bg-gradient-to-tr ${colorObj.value} shrink-0 shadow-sm`} />
                                                <span className="truncate">{colorObj.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.color && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.color}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-xl text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all active:scale-95"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                                >
                                    {processing ? (
                                        <Icons.Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Icons.Save className="w-4 h-4" />
                                    )}
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
