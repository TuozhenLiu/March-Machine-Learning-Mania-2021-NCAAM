library(tidyverse)
source("02_scripts/Utils.R")

list(
  load(file = "03_processing/model_data.RData"),
  load(file = "03_processing/stage_2_submission_data.RData")
)

build_formula <- function(y = "win", x){
  formula <- paste(y, paste(x, collapse = " + "), sep = " ~ ")
  return(formula)
}

# formula <- list()
# formula[["formula.all_cls"]] <- build_formula(y = "win", x = colnames(stage_2_submission_data)[4:91])
# formula[["formula.all_reg"]] <- build_formula(y = "win_by", x = colnames(stage_2_submission_data)[4:91])

output <- register_make_execute_evaluate(
  # data = model_data$Train,
  data = bind_rows(model_data[[1]], model_data[[2]]),
  # type_of_model = "linear_reg",
  # type_of_model = "ridge_reg",
  # type_of_model = "lasso_reg",
  type_of_model = "log_reg",
  # type_of_model = "random_forest",
  # type_of_model = "boost_tree",
  mode = "classification",
  # mode = "regression",
  # regression_formula = "formula.all_cls",
  # regression_formula = "formula.tier1_cls",
  regression_formula = "formula.tier2_cls",
  v = 5,
  # use_bayes = T,
  grid_size = 50,
  grid = expand.grid(penalty = seq(0, 1, 0.1), mixture = seq(0, 1, 0.1)),
  # grid = expand.grid(mtry = c(1, 3, 5), trees = c(500, 1000, 1500), min_n = c(50, 100, 150)),
  # grid = expand.grid(mtry = c(1, 5), trees = c(500, 1000), min_n = c(50, 100), tree_depth = c(5, 10),
  #                    learn_rate = c(1e-03, 1e-04), loss_reduction = tune(), sample_size = tune()),
  grid_notes = "random",
  notes = "xgboost",
  # prediction_data = model_data$Test,
  prediction_data = stage_2_submission_data,
  id = 3,
  save_mode = T,
  seed = 1234
)

output$show_best %>% View()
output$show_best %>% write.csv("04_output/boost_tree_grid_all_show_best.csv")
output$show_best %>% write.csv("04_output/log_reg_grid_tier1_show_best.csv")
output$show_best %>% write.csv("04_output/log_reg_grid_tier2_show_best.csv")

read.csv("model_registry.csv") %>% View()

#------------------------------------------------------------------------------>
importance.plot <- function(output){
  
  # model <- output$final_model$fit$fit$fit
  importance <- importance(output$final_model$fit$fit$fit)
  variables <- names(importance)
  p <- data.frame(variables, importance = as.numeric(importance)) %>%
    ggplot(aes(x = reorder(variables, importance), y = importance, fill = importance)) + 
    geom_bar(stat = "identity") +
    labs(x = "", y = "variable importance (mode: \"inpurity\")") + 
    coord_flip() +
    ggthemes::scale_fill_gradient_tableau() +
    ggthemr::ggthemr("fresh", set_theme = F)$theme + 
    theme(legend.position = "none",
          axis.text.y = element_text(size = 6.5),
          axis.text = element_text(face = "bold"))
  return(p)
}

importance.plot(output)


importance <- importance(output$final_model$fit$fit$fit)

tier1_cls <- importance[importance > 5]
tier2_cls <- importance[importance > 1]

formula[["formula.tier1_cls"]] <- build_formula(y = "win", x = names(tier1_cls))
formula[["formula.tier2_cls"]] <- build_formula(y = "win", x = names(tier2_cls))

tier1_reg <- importance[importance > 5000]
tier2_reg <- importance[importance > 500]

formula[["formula.tier1_reg"]] <- build_formula(y = "win_by", x = names(tier1_reg))
formula[["formula.tier2_reg"]] <- build_formula(y = "win_by", x = names(tier2_reg))

save(formula, file = "03_processing/formula.RData")
