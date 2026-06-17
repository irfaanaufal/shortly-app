import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';

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

export default function Dashboard({ shortcuts = [], userShortcuts = [] }) {
    const { auth } = usePage().props;
    const [copied, setCopied] = useState(false);

    const handleDelete = (shortcutId) => {
        if (confirm('Apakah Anda yakin ingin menghapus shortcut ini secara permanen dari seluruh sistem?')) {
            router.delete(route('shortcuts.destroy', shortcutId), {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteClick = (e, shortcutId) => {
        e.stopPropagation();
        handleDelete(shortcutId);
    };

    const usernameForm = useForm({
        username: auth.user.username || '',
    });

    const shortcutsForm = useForm({
        shortcut_ids: userShortcuts || [],
    });

    const publicUrl = (() => {
        if (typeof window === 'undefined') return '';
        const origin = window.location.origin;
        const path = window.location.pathname;
        const pathLower = path.toLowerCase();

        const publicIndex = pathLower.indexOf('/shortly-app/public/index.php');
        if (publicIndex !== -1) {
            const subDir = path.substring(0, publicIndex);
            return `${origin}${subDir}/shortly-app/public/index.php/u/${auth.user.username}`;
        }

        const dashboardIndex = pathLower.indexOf('/dashboard');
        if (dashboardIndex !== -1) {
            const subDir = path.substring(0, dashboardIndex);
            return `${origin}${subDir}/shortly-app/public/index.php/u/${auth.user.username}`;
        }

        return `${origin}/shortly-app/public/index.php/u/${auth.user.username}`;
    })();

    const fallbackCopy = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                console.error("Fallback copy was unsuccessful");
            }
        } catch (err) {
            console.error("Fallback copy failed", err);
        }
        document.body.removeChild(textArea);
    };

    const handleCopy = () => {
        if (!publicUrl) return;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(publicUrl)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(() => fallbackCopy(publicUrl));
        } else {
            fallbackCopy(publicUrl);
        }
    };

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        usernameForm.post(route('dashboard.username.update'), {
            preserveScroll: true,
        });
    };

    const handleShortcutToggle = (id) => {
        let updated = [...shortcutsForm.data.shortcut_ids];
        updated = updated.includes(id)
            ? updated.filter((item) => item !== id)
            : [...updated, id];
        shortcutsForm.setData('shortcut_ids', updated);
    };

    const handleShortcutsSubmit = (e) => {
        e.preventDefault();
        shortcutsForm.post(route('dashboard.shortcuts.update'), {
            preserveScroll: true,
        });
    };

    const activeCount = shortcutsForm.data.shortcut_ids.length;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Background disesuaikan ke True Charcoal (Abu-abu Gelap Pekat) */}
            <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] pb-12 antialiased transition-colors duration-200">



                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Left Column */}
                        <div className="space-y-6 lg:col-span-1">
                            {/* Public URL Card */}
                            <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-3 flex items-center gap-2">
                                    <Icons.Globe className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                                    Tautan Publik Anda
                                </p>
                                <div className="flex items-center gap-2 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl p-2 pl-3">
                                    <span className="flex-1 text-xs font-mono text-neutral-600 dark:text-neutral-300 truncate select-all">
                                        {publicUrl || 'Generating link...'}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        disabled={!publicUrl}
                                        type="button"
                                        className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 border ${copied
                                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
                                            : 'bg-white dark:bg-[#1e1e1e] text-slate-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                            }`}
                                    >
                                        {copied ? (
                                            <><Icons.Check className="w-3.5 h-3.5 stroke-[2.5]" /> Tersalin</>
                                        ) : (
                                            <><Icons.Copy className="w-3.5 h-3.5" /> Salin</>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Form Username */}
                            <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-4">
                                    Konfigurasi Identitas
                                </p>
                                <form onSubmit={handleUsernameSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="username" className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5">
                                            Username Karyawan
                                        </label>
                                        <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 focus-within:border-neutral-900 dark:focus-within:border-white focus-within:ring-1 focus-within:ring-neutral-900 dark:focus-within:ring-white overflow-hidden transition-all bg-white dark:bg-[#2d2d2d]">
                                            <span className="inline-flex items-center bg-neutral-50 dark:bg-[#1e1e1e] border-r border-neutral-200 dark:border-neutral-700 px-3.5 text-xs text-neutral-400 dark:text-neutral-400 font-mono shrink-0">
                                                /u/
                                            </span>
                                            <input
                                                type="text"
                                                id="username"
                                                required
                                                value={usernameForm.data.username}
                                                onChange={(e) =>
                                                    usernameForm.setData('username', e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))
                                                }
                                                className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 placeholder-neutral-300 dark:placeholder-neutral-500 outline-none"
                                                placeholder="nama.lengkap"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={usernameForm.processing}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                                    >
                                        {usernameForm.processing ? (
                                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Icons.Save className="w-4 h-4" />
                                        )}
                                        Simpan Identitas
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                                <div>
                                    <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                                        Pustaka Shortcut Aplikasi
                                        {auth.user.role === 'admin' && (
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-neutral-950 dark:bg-neutral-800 text-white dark:text-neutral-100 border border-neutral-900 dark:border-neutral-700 rounded">
                                                Admin Mode
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-0.5">
                                        {auth.user.role === 'admin'
                                            ? 'Kelola pustaka shortcut sistem atau pilih untuk grid pribadi Anda.'
                                            : 'Buat shortcut kustom pribadi Anda atau sematkan pintasan bawaan.'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 self-start sm:self-auto">
                                    <Link
                                        href={route('shortcuts.create')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 border border-transparent dark:border-neutral-800 shrink-0"
                                    >
                                        <Icons.Plus className="w-3.5 h-3.5" />
                                        Tambah Shortcut
                                    </Link>
                                    <span className="text-xs font-bold px-2.5 py-1 bg-neutral-100 dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-200 rounded-full border border-neutral-200 dark:border-neutral-800 whitespace-nowrap">
                                        Terpilih: {activeCount} / {shortcuts.length}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {shortcuts.map((shortcut) => {
                                        const isChecked = shortcutsForm.data.shortcut_ids.includes(shortcut.id);
                                        const isEditable = (shortcut.user_id === null && auth.user.role === 'admin') || (shortcut.user_id !== null);
                                        return (
                                            <button
                                                key={shortcut.id}
                                                type="button"
                                                onClick={() => handleShortcutToggle(shortcut.id)}
                                                className={`relative flex items-start text-left gap-3.5 p-4 rounded-xl border transition-all ${isChecked
                                                    ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-[#2d2d2d] ring-1 ring-neutral-900 dark:ring-white'
                                                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1e1e1e] hover:bg-neutral-50 dark:hover:bg-[#2d2d2d]/50'
                                                    }`}
                                            >
                                                {/* Checkbox Square Monochrome */}
                                                <span className={`absolute top-4 right-4 w-4 h-4 rounded flex items-center justify-center border transition-all ${isChecked
                                                    ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900'
                                                    : 'border-neutral-300 dark:border-neutral-700 bg-transparent'
                                                    }`}>
                                                    <Icons.Check className={`w-3 h-3 stroke-[3] transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
                                                </span>

                                                {/* Solid Gradient Icon Box */}
                                                <div className={`flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-tr ${shortcut.color} text-white border border-transparent shadow-sm shrink-0`}>
                                                    <DynamicIcon name={shortcut.icon} className="w-5 h-5" />
                                                </div>

                                                <div className={`pr-5 min-w-0 flex-1 ${isEditable ? 'pb-6' : ''}`}>
                                                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-50 truncate">
                                                        {shortcut.name}
                                                    </p>
                                                    {shortcut.description && (
                                                        <p className="text-[11px] text-neutral-400 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
                                                            {shortcut.description}
                                                        </p>
                                                    )}
                                                    <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-400 truncate mt-1.5 bg-neutral-50 dark:bg-[#2d2d2d] px-1.5 py-0.5 rounded border border-neutral-200/50 dark:border-neutral-700 inline-block max-w-full">
                                                        {shortcut.url}
                                                    </p>
                                                </div>

                                                {/* Controls: Edit and Delete */}
                                                {isEditable && (
                                                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                                                        <Link
                                                            href={route('shortcuts.edit', shortcut.id)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#2d2d2d] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-700 transition-all active:scale-90"
                                                            title="Edit Shortcut"
                                                        >
                                                            <Icons.Pencil className="w-3 h-3" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleDeleteClick(e, shortcut.id)}
                                                            className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#2d2d2d] text-red-600 dark:text-red-400 hover:text-white dark:hover:text-red-200 hover:bg-red-600 dark:hover:bg-red-950 border border-neutral-200 dark:border-neutral-700 hover:border-red-650 transition-all active:scale-90"
                                                            title="Hapus Shortcut"
                                                        >
                                                            <Icons.Trash className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <form onSubmit={handleShortcutsSubmit} className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                                    <button
                                        type="submit"
                                        disabled={shortcutsForm.processing}
                                        className="w-full sm:w-auto float-right flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                                    >
                                        {shortcutsForm.processing ? (
                                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Icons.Save className="w-4 h-4" />
                                        )}
                                        Simpan Susunan Grid
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}