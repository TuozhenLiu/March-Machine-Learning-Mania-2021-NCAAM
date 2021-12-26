library(tidymodels)
library(vip)

conflicted::conflict_prefer(name = "pluck", winner = "purrr", losers = "rvest")
conflicted::conflict_prefer(name = "filter", winner = "dplyr", losers = "stats")

register_model <- function(current_model_data) {
  registry <- read_csv("model_registry.csv")

  model_check <-
    current_model_data %>%
    inner_join(registry)

  if (nrow(model_check) == 0) {
    message("This is a new model")
  } else if (nrow(model_check) == 1) {
    stop(str_c("This model has been done before with an ", model_check$performance_measure, " of ", round(model_check$model_performance, 6)))
  }

  return(registry)
}


register_make_execute_evaluate <- function(data = stats,
                                           type_of_model = "random_forest",
                                           mode = "classification",
                                           # mode = "regression",
                                           regression_formula = NULL,
                                           grid_size = NULL,
                                           grid = NULL,
                                           grid_notes = "random",
                                           v = 5,
                                           prediction_data = stats_final,
                                           notes = "current best model make into regression",
                                           save_mode = T,
                                           id = 99,
                                           seed = 1234,
                                           use_bayes = F) {
  set.seed(seed)
  output <- list()
  
  load(file = "processing/formula.RData")
  regression_formula_type <- regression_formula
  regression_formula <- as.formula(formula[[regression_formula]])
  
  if(!is.null(grid))
    grid_size <- nrow(grid)
  else
    grid <- grid_size
  
  current_model_data <- tibble(
    type_of_model = type_of_model,
    mode = mode,
    regression_formula = regression_formula_type,
    grid_size = grid_size,
    grid = grid_notes, 
    notes = notes,
    id = id
  )

  reg <- register_model(current_model_data = current_model_data)


  splits <- initial_split(data, strata = Season)

  stats_other <- training(splits)
  stats_test <- testing(splits)

  folds <- vfold_cv(stats_other,
    strata = Season,
    v = v
  )

  cores <- parallel::detectCores()

  message(str_c("you are using ", cores, " cores"))

  if (type_of_model == "random_forest") {
    mod <-
      rand_forest(mtry = tune(), min_n = tune(), trees = tune()) %>%
      set_engine("ranger", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "log_reg") {
    mod <-
      logistic_reg(penalty = tune(), mixture = tune()) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "boost_tree") {
    mod <-
      boost_tree(mtry = tune(), trees = tune(), min_n = tune(), tree_depth = tune(), learn_rate = tune(), loss_reduction = tune(), sample_size = tune(), stop_iter = 10) %>%
      set_engine("xgboost", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "linear_reg"){
    mod <-
      linear_reg(penalty = 0) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "ridge_reg"){
    mod <-
      linear_reg(penalty = tune(), mixture = 0) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "lasso_reg"){
    mod <-
      linear_reg(penalty = tune(), mixture = 1) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  }

  if (mode == "regression") {
    mod <-
      mod %>%
      set_mode("regression")
  } else if (mode == "classification") {
    mod <-
      mod %>%
      set_mode("classification")
  }

  recipe <-
    recipe(regression_formula, data = stats_other) %>%
    step_interact(terms = ~ conf_wins_against_B / (conf_wins_against_B + conf_loss_against_B)) %>%
    step_interact(terms = ~ conf_wins_against_A / (conf_wins_against_A + conf_loss_against_A)) %>%
    step_nzv(all_predictors(), -all_outcomes()) %>%
    step_impute_knn(all_predictors()) %>%
    # step_meanimpute(all_numeric(), - all_outcomes()) %>%
    step_center(all_numeric(), -all_outcomes()) %>%
    step_scale(all_numeric(), -all_outcomes())

  workflow <-
    workflow() %>%
    add_model(mod) %>%
    add_recipe(recipe)

  if (mode == "regression") {
    metrics <- c("rmse", "rsq", "ccc")
    metrics_id <- metric_set(rmse, rsq, ccc)
  } else if (mode == "classification") {
    metrics <- c("mn_log_loss", "accuracy", "kap")
    metrics_id <- metric_set(mn_log_loss, kap)
  }

  message(str_c("Begin CV to tune parameters with grid size of ", grid_size, " with ", metrics[1]), " on a ", mode, " model.")
  
  if (use_bayes){
    res <-
      workflow %>%
      tune_bayes(folds,
                 control = control_bayes(save_pred = TRUE, verbose = T),
                 metrics = metrics_id
      )
  }else{
    res <-
      workflow %>%
      tune_grid(folds,
                grid = grid,
                control = control_grid(save_pred = TRUE, verbose = T),
                metrics = metrics_id
      )
  }

  message(str_c("Complete CV to tune parameters with grid size of ", grid_size))

  best <-
    res %>%
    select_best(metric = metrics[1])
  
  # message(str_c("Show best tune parameters with grid size of ", grid_size))
  # print(res %>% show_best())
  output[["show_best"]] <- res %>% show_best(metric = metrics[1], n = 20)
  
  if (type_of_model == "linear_reg")
    best_params <- NULL
  else{
    best_params <- best %>% 
      pivot_longer(cols = -.config) %>% 
      mutate(combine = str_c(name, value, sep = ":")) %>% 
      pull(combine) %>% 
      str_c(collapse = ", ")
  }

  if (type_of_model == "random_forest") {
    last_mod <-
      rand_forest(mtry = best$mtry, min_n = best$min_n, trees = best$trees) %>%
      set_engine("ranger", num.threads = cores, keep.inbag = TRUE, importance = "impurity")
  } else if (type_of_model == "log_reg") {
    last_mod <-
      logistic_reg(penalty = best$penalty, mixture = best$mixture) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "boost_tree") {
    last_mod <-
      boost_tree(mtry = best$min_n, trees = best$trees, min_n = best$min_n, tree_depth = best$tree_depth, learn_rate = best$learn_rate, loss_reduction = best$loss_reduction, sample_size = best$sample_size, stop_iter = 10) %>%
      set_engine("xgboost", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "linear_reg"){
    last_mod <-
      linear_reg(penalty = 0) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "ridge_reg"){
    last_mod <-
      linear_reg(penalty = best$penalty, mixture = 0) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  } else if (type_of_model == "lasso_reg"){
    last_mod <-
      linear_reg(penalty = best$penalty, mixture = 1) %>%
      set_engine("glmnet", num.threads = cores, keep.inbag = TRUE)
  }
  

  if (mode == "regression") {
    last_mod <-
      last_mod %>%
      set_mode("regression")
  } else if (mode == "classification") {
    last_mod <-
      last_mod %>%
      set_mode("classification")
  }

  last_workflow <-
    workflow %>%
    update_model(last_mod)

  set.seed(345)
  last_fit <-
    last_workflow %>%
    last_fit(splits)

  message(str_c("Begin model on entire data"))

  final_model <- fit(last_workflow, data)
  
  output[["final_model"]] <- final_model

  if (mode == "regression") {
    message(str_c("Begin make predictions"))

    data_with_predictions <-
      prediction_data %>%
      bind_cols(predict(final_model, new_data = prediction_data))

  } else if (mode == "classification") {
    message(str_c("Begin make predictions"))


    data_with_predictions <-
      prediction_data %>%
      bind_cols(predict(final_model, new_data = prediction_data, type = "prob")) %>%
      bind_cols(predict(final_model, new_data = prediction_data))

  }
  model_performance <- output[["show_best"]] %>% head(1) %>% pull(mean)
  message(str_c("This model has a ", metrics[1], " of ",
                round(model_performance, 6)))

  new_registry <-
    reg %>%
    bind_rows(
      current_model_data %>%
        mutate(model_performance = model_performance,
               performance_measure = metrics[1],
               best_params = best_params,
               id = id)
    )
  
  if (save_mode) {
    write_csv(new_registry, "model_registry.csv")
    if (mode == "regression") {
      data_with_predictions <-
        data_with_predictions %>%
        unite(col = ID, sep = "_", Season, WTeamID, LTeamID) %>%
        select(ID, Pred = contains("pred"))
    } else if (mode == "classification") {
      data_with_predictions <-
        data_with_predictions %>%
        unite(col = ID, sep = "_", Season, WTeamID, LTeamID) %>%
        select(ID, Pred = .pred_win)
    }

    write_csv(data_with_predictions, str_c("05_submissions/submission_", mode, "_", type_of_model, "_id", id, ".csv"))
  }
  output[["data_with_predictions"]] <- data_with_predictions
  return(output)
}
