library(tidyverse)
df_label <- read.csv(file = "2021_label.csv")

eval <- function(df_submission, id, return_df = F){
  t = 6
  if (str_sub(id, 1, 3) == "cls"){
    df_submission <- df_submission %>%
      separate(ID, into = c("Season", "WTeamID", "LTeamID"), convert = T)
  }else{
    df_submission <- df_submission %>%
      separate(ID, into = c("Season", "WTeamID", "LTeamID"), convert = T) %>%
      mutate(Pred = exp(Pred / t) / (1 + exp(Pred / t)))
  }
  
  df_submission <- df_submission %>%
    mutate(LTeamID_ = LTeamID,
           LTeamID = WTeamID,
           WTeamID = LTeamID_,
           Pred = 1 - Pred) %>%
    select(-LTeamID_) %>%
    bind_rows(df_submission)
  
  df_submission %>%
    right_join(df_label, by = c("Season", "WTeamID", "LTeamID")) -> df
  
  if (return_df){
    return(df %>% mutate(id = id))
  }else{
    acc <- df %>% filter(Pred >= 0.5) %>% nrow() / nrow(df)
    logloss <- - sum(log(df$Pred)) / nrow(df)  
    return(data.frame(id, acc, logloss))
  }
}

root_dir <- "05_submissions/"
eval_df <- data.frame()
for(file in list.files(root_dir)){
  id <- str_extract(file, "(?<=submission_).*(?=\\.csv)")
  id <- str_replace(id, "regression", "reg")
  id <- str_replace(id, "classification", "cls")
  eval_df <- bind_rows(eval_df, eval(read.csv(file = paste0(root_dir, file)), id))
}
eval_df %>% View()

eval_df <- data.frame()
for(file in list.files(root_dir)){
  id <- str_extract(file, "(?<=submission_).*(?=\\.csv)")
  id <- str_replace(id, "regression", "reg")
  id <- str_replace(id, "classification", "cls")
  return_df <- eval(read.csv(file = paste0(root_dir, file)), id, return_df = T)
  eval_df <- bind_rows(eval_df, return_df)
}

eval_df %>%
  filter(id %in% c("cls_random_forest_id1", "cls_random_forest_id3", 
                   "reg_lasso_reg_id1", "reg_linear_reg_id1")) %>%
  group_by(WTeamID, LTeamID) %>%
  summarise(Pred = mean(Pred)) -> eval_df

acc <- eval_df %>% filter(Pred >= 0.5) %>% nrow() / nrow(eval_df); acc
logloss <- - sum(log(eval_df$Pred)) / nrow(eval_df); logloss

eval_df %>% write.csv(file = "final_ensemble.csv")

