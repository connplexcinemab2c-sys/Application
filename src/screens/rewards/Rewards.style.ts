import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const CARD_BG = '#1E1A15';
const BORDER_COLOR = '#2A2419';

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  // ── Stat cards ──────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCardMid: {
    marginHorizontal: 0,
  },
  availableCard: {
    borderWidth: 1,
    borderColor: color.golden,
  },
  statIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2A2419',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statTextCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: 8,
    color: color.gray,
    fontFamily: font.poppinsRegular,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.poppinsSemiBold,
    lineHeight: 20,
  },
  statSubtitle: {
    fontSize: 8,
    color: color.gray,
    fontFamily: font.poppinsLight,
    marginTop: 1,
  },

  // ── Filter row ───────────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 6,
  },
  filterTab: {
    borderWidth: 1,
    borderColor: '#3A3025',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  filterTabActive: {
    backgroundColor: color.golden,
    borderColor: color.golden,
  },
  filterTabText: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsRegular,
  },
  filterTabTextActive: {
    color: '#1A1409',
    fontFamily: font.poppinsSemiBold,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3025',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    minWidth: 120,
    maxWidth: 150,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsLight,
    paddingVertical: 0,
    marginLeft: 6,
  },

  // ── Card ─────────────────────────────────────────────────
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardMovieName: {
    flex: 1,
    fontSize: 13,
    color: color.white,
    fontFamily: font.poppinsSemiBold,
    marginRight: 10,
  },
  cardBookingId: {
    fontSize: 11,
    color: color.gray,
    fontFamily: font.poppinsRegular,
    marginBottom: 10,
  },
  cardBookingIdValue: {
    color: color.golden,
    fontFamily: font.poppinsMedium,
  },
  cardDivider: {
    height: 1,
    backgroundColor: BORDER_COLOR,
    marginBottom: 10,
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  cardInfoLabel: {
    fontSize: 9,
    color: color.gray,
    fontFamily: font.poppinsRegular,
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  cardInfoValue: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsMedium,
  },

  // ── Type badge ───────────────────────────────────────────
  typeBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  earnedBadge: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76,175,80,0.1)',
  },
  redeemedBadge: {
    borderColor: '#E57373',
    backgroundColor: 'rgba(229,115,115,0.1)',
  },
  typeBadgeText: {
    fontSize: 10,
    fontFamily: font.poppinsMedium,
  },

  // ── Empty ────────────────────────────────────────────────
  noData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
});

export default style;
