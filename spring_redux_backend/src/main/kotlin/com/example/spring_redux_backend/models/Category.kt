package com.example.spring_redux_backend.models

import com.example.spring_redux_backend.common.GenerateUUID
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository


@Document
data class Category(
    val name: String,
    val color: String = "",
    val description: String = "",
    @Id val id: String = GenerateUUID()
){
}

@Repository
interface CategoryRepository: MongoRepository<Category, String> {
  fun findByNameIn(names: Set<String>): Iterable<Category>
}
