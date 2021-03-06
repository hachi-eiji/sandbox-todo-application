create_table "task_assigns", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
  t.bigint "task_id", null: false
  t.bigint "user_id", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.index ["task_id"], name: "index_task_assigns_on_task_id"
  t.index ["user_id"], name: "index_task_assigns_on_user_id"
end
