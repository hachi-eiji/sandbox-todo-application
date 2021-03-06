create_table "project_members", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
  t.bigint "project_id", null: false
  t.bigint "user_id", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.index ["project_id"], name: "index_project_members_on_project_id"
  t.index ["user_id"], name: "index_project_members_on_user_id"
end
