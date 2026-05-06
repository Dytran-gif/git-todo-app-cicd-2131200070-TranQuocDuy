const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

describe('Controller-Model Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        // Reset singleton
        const s = new TodoService();
        s.todos = [];
        s.observers = [];
        service = s;

        // Controller không cần view trong integration test
        controller = new Controller(service, null);
    });

    test('handleAddTodo - should add todo via controller', () => {
        controller.handleAddTodo('Learn testing');
        expect(service.todos.length).toBe(1);
        expect(service.todos[0].text).toBe('Learn testing');
    });

    test('handleToggleTodo - should toggle todo via controller', () => {
        controller.handleAddTodo('Learn testing');
        const id = service.todos[0].id;
        controller.handleToggleTodo(id);
        expect(service.todos[0].completed).toBe(true);
    });

    test('handleRemoveTodo - should remove todo via controller', () => {
        controller.handleAddTodo('Learn testing');
        const id = service.todos[0].id;
        controller.handleRemoveTodo(id);
        expect(service.todos.length).toBe(0);
    });

    test('should handle multiple todos correctly', () => {
        controller.handleAddTodo('Task 1');
        controller.handleAddTodo('Task 2');
        controller.handleAddTodo('Task 3');
        expect(service.todos.length).toBe(3);
        
        const id = service.todos[1].id;
        controller.handleRemoveTodo(id);
        expect(service.todos.length).toBe(2);
    });
});