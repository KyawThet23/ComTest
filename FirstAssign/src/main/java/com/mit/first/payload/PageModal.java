package com.mit.first.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageModal {

	private int currentPage;
    private int pageSize;
    private long totalItems;
    private int totalPages;

}
