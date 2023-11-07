import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({ user: userReducer })

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

//https://accounts.google.com/signin/oauth/v2/consentsummary?authuser=0&part=AJi8hAOd9FuXM1N_56LZIn_zwMfJMp8flEcXtT2bxax3STLHvbqxOF8VQdsX5vdfq2TYA8V9CB1QOPBRK4LVKRtS93mfOwTpLZ0g6or4TpKUmFem0go6pUZczEoCsd67oERJWJrxa7u_6PyyMui7G8hFa8Ks_BTmX8P7f50fKpbfuwJzfbS9zj64CevhdAYw8yoIRK10K3Of464_cGW66F3Dhda5HzuM6hAKb0WzRAskygJvXXB4k0MoAWIcYuu5kKSZr4_q1HeZVGf2lP0Cblpz4SWUWlK0bPjvKQDF1LuyyjB8PPdQI0ILt5He7XkKRnDtxZYum1RQ2GwRATCpkipjIziU9qFA7Z8DNT45fhH1C3U5-n5m5XKzGgRSemCVjzOLSbu0IDEgDWcgoAqq36WB9QfAuCuY38gR_NOnV66kXamo-4-LCTj7pfq1xSSBu06nwc8A0ALwZx2PW544UPsu_VnZjfXAQJ0A5dxxB9K9CZzKN8pvRbuNOSE8guYv8hVHIriSzvIKZjjMv5FOKfqFA2pCSWFdJg&as=S-805169462%3A1699342970873224&client_id=31377706731-1hgv51kj0e16m8jqubi4nlvq07ebnusa.apps.googleusercontent.com&theme=glif&pli=1&rapt=AEjHL4OTapu8XDGZn2qdAlHe947IcMMqQwEAs6N8KfnfEHVwPAsvtUrsXApJZtmtFUP5gRx8ADAJB4Fi3xTJ90aQThuloJL7OA

/**
 * 
 * 
 * https://calendar.cron.com/auth?state=provider%3Dgoogle%26client%3Dweb&code=4%2F0AfJohXmcn3NlhBunFReBFE7OG9UGhgN_Bk4nPZ9cUCbzbaq_HehehiMFmzq3rlLww1WYwA&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadmin.directory.resource.calendar.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts.other.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.settings.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdirectory.readonly+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent

 */
